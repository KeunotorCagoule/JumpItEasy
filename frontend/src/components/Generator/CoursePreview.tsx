import React, { useState } from 'react';
import { CourseLayout, Obstacle } from '../../types/course';

interface CoursePreviewProps {
  course: CourseLayout;
}

const CoursePreview: React.FC<CoursePreviewProps> = ({ course }) => {
  const [selectedObstacle, setSelectedObstacle] = useState<Obstacle | null>(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{course.name}</h2>
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {course.duration} minutes
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            {course.difficulty}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-600">{course.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          {/* Start Line */}
          <div 
            className="absolute h-12 w-2 bg-green-600 rounded-full flex items-center justify-center"
            style={{
              left: `${course.startPoint.x}%`,
              top: `${course.startPoint.y - 3}%`,
            }}
          >
            <span className="absolute -right-6 text-xs font-bold text-green-800">START</span>
          </div>
          
          {/* Finish Line */}
          <div 
            className="absolute h-12 w-2 bg-red-600 rounded-full flex items-center justify-center"
            style={{
              left: `${course.finishPoint.x}%`,
              top: `${course.finishPoint.y - 3}%`,
            }}
          >
            <span className="absolute -right-6 text-xs font-bold text-red-800">FINISH</span>
          </div>
          
          {/* Course Obstacles */}
          {course.obstacles.map((obstacle) => {
            if (obstacle.type === 'Hurdle') {
              // Render hurdle as a rectangle
              return (
                <div
                  key={obstacle.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer
                    ${selectedObstacle?.id === obstacle.id ? 'ring-2 ring-blue-500' : ''}`}
                  style={{
                    left: `${obstacle.position.x}%`,
                    top: `${obstacle.position.y}%`,
                    width: '20px',
                    height: '10px',
                    backgroundColor: 'brown',
                    border: '1px solid #964B00'
                  }}
                  onClick={() => setSelectedObstacle(obstacle)}
                >
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs font-bold">
                    {obstacle.number}
                  </div>
                  
                  {/* Direction arrow */}
                  <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs">
                    ➡️
                  </div>
                </div>
              );
            } else if (obstacle.type === 'Water') {
              // Render water as a blue circle
              return (
                <div
                  key={obstacle.id}
                  className={`absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer
                    ${selectedObstacle?.id === obstacle.id ? 'ring-2 ring-blue-500' : ''}`}
                  style={{
                    left: `${obstacle.position.x}%`,
                    top: `${obstacle.position.y}%`,
                    width: '15px',
                    height: '15px',
                    backgroundColor: 'blue',
                    opacity: 0.7
                  }}
                  onClick={() => setSelectedObstacle(obstacle)}
                >
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs font-bold">
                    {obstacle.number}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Obstacle Details */}
        <div className="bg-gray-50 p-4 rounded-lg">
          {selectedObstacle ? (
            <div>
              <h3 className="font-semibold text-lg mb-2">
                {selectedObstacle.name} #{selectedObstacle.number}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {selectedObstacle.description}
              </p>
              <div className="flex gap-2 mb-2">
                <span className="px-2 py-1 bg-gray-200 rounded-full text-xs">
                  {selectedObstacle.difficulty}
                </span>
                <span className="px-2 py-1 bg-gray-200 rounded-full text-xs">
                  {selectedObstacle.type}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              Select an obstacle to view details
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Legend</h3>
        <div className="flex gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded-full" />
            <span className="text-sm">Start</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded-full" />
            <span className="text-sm">Finish</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: '20px', height: '10px', backgroundColor: 'brown' }} />
            <span className="text-sm">Hurdle</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded-full" />
            <span className="text-sm">Water</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
