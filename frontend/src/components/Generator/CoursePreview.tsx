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
          {/* Course Map */}
          <div className="absolute inset-0">
            {course.obstacles.map((obstacle) => (
              <button
                key={obstacle.id}
                className={`absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer
                  ${selectedObstacle?.id === obstacle.id ? 'bg-blue-500' : 'bg-red-500'}`}
                style={{
                  left: `${obstacle.position.x}%`,
                  top: `${obstacle.position.y}%`
                }}
                onClick={() => setSelectedObstacle(obstacle)}
              />
            ))}
            
            {course.restPoints.map((point) => (
              <div
                key={point.id}
                className="absolute w-4 h-4 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${point.position.x}%`,
                  top: `${point.position.y}%`
                }}
              />
            ))}

            {course.progressMarkers.map((marker) => (
              <div
                key={marker.id}
                className="absolute w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-xs text-white transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${marker.position.x}%`,
                  top: `${marker.position.y}%`
                }}
              >
                {marker.checkpoint}
              </div>
            ))}
          </div>
        </div>

        <div>
          {selectedObstacle ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{selectedObstacle.name}</h3>
              <p className="text-gray-600">{selectedObstacle.description}</p>
              
              <div>
                <h4 className="font-medium mb-2">Required Techniques</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedObstacle.techniques.map((technique, index) => (
                    <li key={index} className="text-gray-600">{technique}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Safety Notes</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedObstacle.safetyNotes.map((note, index) => (
                    <li key={index} className="text-gray-600">{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Warm-up Exercises</h3>
                <ul className="list-disc list-inside space-y-1">
                  {course.warmupExercises.map((exercise, index) => (
                    <li key={index} className="text-gray-600">{exercise}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Safety Considerations</h3>
                <ul className="list-disc list-inside space-y-1">
                  {course.safetyConsiderations.map((consideration, index) => (
                    <li key={index} className="text-gray-600">{consideration}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Legend</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full" />
            <span className="text-sm">Obstacle</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full" />
            <span className="text-sm">Rest Point</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full" />
            <span className="text-sm">Progress Marker</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
