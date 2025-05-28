import React, { useState, useEffect } from 'react';
import { CourseLayout, Obstacle } from '../../types/course';
import { useLanguage } from '../../context/LanguageContext';

interface CoursePreviewProps {
  course: CourseLayout;
}

const CoursePreview: React.FC<CoursePreviewProps> = ({ course }) => {
  const { t } = useLanguage();
  const [selectedObstacle, setSelectedObstacle] = useState<Obstacle | null>(null);
  
  // Reset selected obstacle when course changes
  useEffect(() => {
    setSelectedObstacle(null);
  }, [course]);
  
  // Check if there are any water obstacles in the course
  const hasWaterObstacles = course.obstacles.some(obstacle => obstacle.type === 'Water');

  // Helper function to convert degrees to radians
  const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180;

  // Helper function to create arrow points for direction indicator
  const getArrowPath = (x: number, y: number, direction: number, length: number = 15) => {
    const rad = degreesToRadians(direction);
    const endX = x + Math.cos(rad) * length;
    const endY = y + Math.sin(rad) * length;
    
    // Arrow head points
    const arrowRad1 = rad + Math.PI * 0.8;
    const arrowRad2 = rad - Math.PI * 0.8;
    const arrowLength = 6;
    
    const arrow1X = endX + Math.cos(arrowRad1) * arrowLength;
    const arrow1Y = endY + Math.sin(arrowRad1) * arrowLength;
    const arrow2X = endX + Math.cos(arrowRad2) * arrowLength;
    const arrow2Y = endY + Math.sin(arrowRad2) * arrowLength;
    
    return {
      line: `M ${x} ${y} L ${endX} ${endY}`,
      arrowHead: `M ${endX} ${endY} L ${arrow1X} ${arrow1Y} M ${endX} ${endY} L ${arrow2X} ${arrow2Y}`
    };
  };
  // Helper function to get hurdle line coordinates (perpendicular to direction)
  const getHurdleLine = (x: number, y: number, direction: number, width: number = 20) => {
    const perpendicularDirection = direction + 90; // Perpendicular to arrow
    const rad = degreesToRadians(perpendicularDirection);
    const halfWidth = width / 2;
    
    const startX = x + Math.cos(rad) * halfWidth;
    const startY = y + Math.sin(rad) * halfWidth;
    const endX = x - Math.cos(rad) * halfWidth;
    const endY = y - Math.sin(rad) * halfWidth;
    
    return `M ${startX} ${startY} L ${endX} ${endY}`;
  };  // Helper function to calculate optimal number position based on obstacle direction
  const getNumberPosition = (x: number, y: number, direction: number) => {
    // Base position above the obstacle
    let offsetX = 0;
    let offsetY = -18; // Always above by default
    
    // Adjust horizontal position slightly based on direction to avoid arrow overlap
    const normalizedDirection = direction % 360;
    
    // If arrow points upward (270° ± 45°), move number to the side
    if (normalizedDirection >= 225 && normalizedDirection <= 315) {
      offsetX = normalizedDirection < 270 ? -15 : 15; // Left or right
      offsetY = -10; // Less above
    }
    // If arrow points downward (90° ± 45°), keep above but further
    else if (normalizedDirection >= 45 && normalizedDirection <= 135) {
      offsetY = -25; // Further above
    }
    // If arrow points left or right, slight vertical adjustment
    else if ((normalizedDirection >= 315 || normalizedDirection <= 45) || (normalizedDirection >= 135 && normalizedDirection <= 225)) {
      offsetX = normalizedDirection >= 135 && normalizedDirection <= 225 ? 8 : -8; // Slight horizontal offset
    }
    
    return {
      x: x + offsetX,
      y: y + offsetY
    };
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{course.name}</h2>
        <div className="flex items-center gap-4">          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {course.duration} {t('common.minutes')}
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            {t(`courses.generate.filters.difficultyLevels.${course.difficulty.toLowerCase()}`)}
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
            {course.obstacles.length} {t('common.obstacles')}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-600">{course.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Course Visualization */}
        <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 border-gray-200">
          <svg width="100%" height="100%" viewBox="0 0 400 400" className="absolute inset-0">            {/* Start Line */}
            <g>
              {/* Start line (like a hurdle, perpendicular to direction) */}
              <path
                d={getHurdleLine(course.startPoint.x * 4, course.startPoint.y * 4, course.startPoint.direction || 0, 28)}
                stroke="#059669"
                strokeWidth="5"
                strokeLinecap="round"
              />              {/* Start direction arrow */}
              {course.startPoint.direction !== undefined && (
                <>
                  <path
                    d={getArrowPath(course.startPoint.x * 4, course.startPoint.y * 4, course.startPoint.direction, 25).line}
                    stroke="#059669"
                    strokeWidth="3"
                  />
                  <path
                    d={getArrowPath(course.startPoint.x * 4, course.startPoint.y * 4, course.startPoint.direction, 25).arrowHead}
                    stroke="#059669"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </>
              )}
            </g>

            {/* Finish Line */}
            <g>
              {/* Finish line (like a hurdle, perpendicular to direction) */}
              <path
                d={getHurdleLine(course.finishPoint.x * 4, course.finishPoint.y * 4, course.finishPoint.direction || 0, 28)}
                stroke="#DC2626"
                strokeWidth="5"
                strokeLinecap="round"
              />              {/* Finish direction arrow */}
              {course.finishPoint.direction !== undefined && (
                <>
                  <path
                    d={getArrowPath(course.finishPoint.x * 4, course.finishPoint.y * 4, course.finishPoint.direction, 25).line}
                    stroke="#DC2626"
                    strokeWidth="3"
                  />
                  <path
                    d={getArrowPath(course.finishPoint.x * 4, course.finishPoint.y * 4, course.finishPoint.direction, 25).arrowHead}
                    stroke="#DC2626"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </>
              )}
            </g>

            {/* Course Obstacles */}
            {course.obstacles.map((obstacle) => {
              const x = obstacle.position.x * 4;
              const y = obstacle.position.y * 4;
              
              if (obstacle.type === 'Hurdle') {
                return (
                  <g key={obstacle.id} className="cursor-pointer">
                    {/* Hurdle line (perpendicular to direction) */}
                    <path
                      d={getHurdleLine(x, y, obstacle.direction || 0, 24)}
                      stroke="#8B4513"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    {/* Direction arrow (perpendicular to hurdle) */}
                    {obstacle.direction !== undefined && (
                      <>
                        <path
                          d={getArrowPath(x, y, obstacle.direction, 20).line}
                          stroke="#8B4513"
                          strokeWidth="2"
                        />
                        <path
                          d={getArrowPath(x, y, obstacle.direction, 20).arrowHead}
                          stroke="#8B4513"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </>                    )}

                    {/* Obstacle number - positioned based on obstacle direction to avoid overlap */}
                    {(() => {
                      const numberPos = getNumberPosition(x, y, obstacle.direction || 0);
                      return (
                        <text
                          x={numberPos.x}
                          y={numberPos.y}
                          textAnchor="middle"
                          className="fill-gray-900 text-lg font-bold"
                          style={{ fontSize: '16px' }}
                        >
                          {obstacle.number}
                        </text>
                      );
                    })()}{/* Clickable area - centered on the hurdle */}
                    <circle
                      cx={x}
                      cy={y}
                      r="20"
                      fill="transparent"
                      onClick={() => setSelectedObstacle(obstacle)}
                      className={`cursor-pointer ${selectedObstacle?.id === obstacle.id ? 'stroke-blue-500 stroke-2' : ''}`}
                    />
                  </g>
                );
              } else if (obstacle.type === 'Water') {
                return (
                  <g key={obstacle.id} className="cursor-pointer">
                    {/* Water circle */}
                    <circle
                      cx={x}
                      cy={y}
                      r="8"                      fill="#3B82F6"
                      opacity="0.7"
                      onClick={() => setSelectedObstacle(obstacle)}
                      className={selectedObstacle?.id === obstacle.id ? 'stroke-blue-500 stroke-2' : ''}
                    />

                    {/* Water number - positioned above the water circle */}
                    <text
                      x={x}
                      y={y - 15}
                      textAnchor="middle"
                      className="fill-blue-800 text-lg font-bold"
                      style={{ fontSize: '16px' }}
                    >
                      {obstacle.number}
                    </text>
                  </g>
                );
              }
              return null;
            })}
          </svg>
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
              <div className="flex gap-2 mb-2 flex-wrap">
                <span className="px-2 py-1 bg-gray-200 rounded-full text-xs">
                  {selectedObstacle.difficulty}
                </span>
                <span className="px-2 py-1 bg-gray-200 rounded-full text-xs">
                  {selectedObstacle.type}
                </span>                {selectedObstacle.direction !== undefined && selectedObstacle.type === 'Hurdle' && (
                  <span className="px-2 py-1 bg-blue-200 rounded-full text-xs">
                    {t('courses.generate.coursePreview.directionDegrees')}: {selectedObstacle.direction}°
                  </span>
                )}
              </div>              {selectedObstacle.techniques && (
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-700">{t('courses.generate.coursePreview.techniques')}: </span>
                  <span className="text-sm text-gray-600">
                    {selectedObstacle.techniques.join(', ')}
                  </span>
                </div>
              )}
              {selectedObstacle.safetyNotes && (
                <div>
                  <span className="text-sm font-medium text-gray-700">{t('courses.generate.coursePreview.safety')}: </span>
                  <span className="text-sm text-gray-600">
                    {selectedObstacle.safetyNotes.join(', ')}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              {t('courses.generate.coursePreview.clickObstacle')}
            </p>
          )}
        </div>
      </div>      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">{t('courses.generate.coursePreview.legend')}</h3>
        <div className="flex gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-green-600 rounded" />
            <span className="text-sm">{t('courses.generate.coursePreview.startLine')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-red-600 rounded" />
            <span className="text-sm">{t('courses.generate.coursePreview.finishLine')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 bg-amber-700 rounded" />
            <span className="text-sm">{t('courses.generate.coursePreview.hurdle')}</span>
          </div>
          {hasWaterObstacles && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 rounded-full opacity-70" />
              <span className="text-sm">{t('courses.generate.coursePreview.waterObstacle')}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="text-sm">→</div>
            <span className="text-sm">{t('courses.generate.coursePreview.direction')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
