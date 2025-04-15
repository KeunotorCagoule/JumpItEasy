import React, { useState, useEffect } from 'react';
import { CourseFilters, CourseLayout } from '../../types/course';
import FilterPanel from '../../components/Generator/FilterPanel';
import CoursePreview from '../../components/Generator/CoursePreview';

const Generate: React.FC = () => {
  const [filters, setFilters] = useState<CourseFilters>({
    duration: 30,
    obstacleCount: 15,
    hasWaterElements: false,
    difficulty: 'Beginner',
    terrainType: 'Urban',
    heightRange: 'Ground Level',
    equipment: 'None',
    courseType: 'Linear',
    environment: 'Outdoor',
    safetyFeatures: 'Standard'
  });

  const [courseLayout, setCourseLayout] = useState<CourseLayout | null>(null);

  useEffect(() => {
    // In a real application, this would be an API call
    const generateCourse = () => {
      // Simulated course generation based on filters
      const newCourse: CourseLayout = {
        id: Math.random().toString(36).substr(2, 9),
        name: `${filters.difficulty} ${filters.terrainType} Course`,
        description: `A ${filters.duration}-minute ${filters.courseType.toLowerCase()} course with ${filters.obstacleCount} obstacles`,
        duration: filters.duration,
        obstacleCount: filters.obstacleCount,
        difficulty: filters.difficulty,
        obstacles: Array(filters.obstacleCount).fill(null).map((_, index) => ({
          id: `obs-${index}`,
          name: `Obstacle ${index + 1}`,
          type: ['Jump', 'Vault', 'Climb', 'Balance'][Math.floor(Math.random() * 4)],
          difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)] as 'Easy' | 'Medium' | 'Hard',
          description: 'Dynamic obstacle requiring precise movement',
          techniques: ['Precision Jump', 'Cat Leap', 'Kong Vault'],
          height: Math.floor(Math.random() * 3) + 1,
          position: {
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10
          },
          safetyNotes: ['Check landing surface', 'Maintain three points of contact']
        })),
        warmupExercises: [
          'Dynamic stretching',
          'Light jogging',
          'Joint mobility exercises',
          'Basic vaults practice'
        ],
        restPoints: Array(3).fill(null).map((_, index) => ({
          id: `rest-${index}`,
          position: {
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10
          }
        })),
        progressMarkers: Array(5).fill(null).map((_, index) => ({
          id: `prog-${index}`,
          position: {
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10
          },
          checkpoint: index + 1
        })),
        safetyConsiderations: [
          'Always check obstacle stability',
          'Maintain safe landing zones',
          'Be aware of surface conditions',
          'Practice progressive difficulty'
        ]
      };
      setCourseLayout(newCourse);
    };

    generateCourse();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<CourseFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Generate Parkour Course</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <FilterPanel filters={filters} onChange={handleFilterChange} />
        </div>
        
        <div className="lg:w-2/3">
          {courseLayout && <CoursePreview course={courseLayout} />}
        </div>
      </div>
    </div>
  );
};

export default Generate;
