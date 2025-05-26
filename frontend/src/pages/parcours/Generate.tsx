import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseFilters, CourseLayout } from '../../types/course';
import FilterPanel from '../../components/Generator/FilterPanel';
import CoursePreview from '../../components/Generator/CoursePreview';
import { generateParcours } from '../../services/parcourService';
import { useLanguage } from '../../context/LanguageContext';

const Generate: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<CourseFilters>({
    title: '',
    description: '',
    isPrivate: false,
    duration: 30,
    obstacleCount: 15,
    hasWaterElements: false,
    difficulty: 'Beginner',
    equipment: 'None',
    courseType: '1',
  });

  const [courseLayout, setCourseLayout] = useState<CourseLayout | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Generate preview based on filters
    const generatePreview = () => {
      // Calculate water obstacles based on a ratio (1 water obstacle per 4 regular obstacles)
      const totalObstacles = filters.obstacleCount;
      const waterObstaclesCount = filters.hasWaterElements 
        ? Math.floor(totalObstacles / 4) 
        : 0;
      const regularObstaclesCount = totalObstacles - waterObstaclesCount;
      
      // Create obstacles array with numbered hurdles and water obstacles
      const obstacles = [];
      
      // Create regular hurdle obstacles with sequential numbering
      for (let i = 0; i < regularObstaclesCount; i++) {
        obstacles.push({
          id: `hurdle-${i + 1}`,
          name: `Obstacle ${i + 1}`,
          number: i + 1,
          type: 'Hurdle', 
          shape: 'rectangle',
          difficulty: filters.difficulty as 'Easy' | 'Medium' | 'Hard',
          description: `Hurdle obstacle ${i + 1} to jump over`,
          techniques: ['Precision Jump'],
          height: 1,
          position: {
            x: 10 + (i * (80 / totalObstacles)),
            y: 50 + (Math.sin(i) * 10) // Create a slight wave pattern
          },
          safetyNotes: ['Check landing surface']
        });
      }
      
      // Add water obstacles as blue circles
      if (filters.hasWaterElements) {
        for (let i = 0; i < waterObstaclesCount; i++) {
          // Insert water obstacles at regular intervals
          const insertPosition = Math.floor((i + 1) * (regularObstaclesCount / (waterObstaclesCount + 1)));
          obstacles.splice(insertPosition, 0, {
            id: `water-${i + 1}`,
            name: `Water ${i + 1}`,
            number: insertPosition + 1,
            type: 'Water',
            shape: 'circle',
            difficulty: filters.difficulty as 'Easy' | 'Medium' | 'Hard',
            description: 'Water obstacle to jump over',
            techniques: ['Jump'],
            height: 1,
            position: {
              x: 10 + (insertPosition * (80 / totalObstacles)),
              y: 50 + (Math.sin(insertPosition) * 10)
            },
            safetyNotes: ['Check water depth']
          });
        }
      }
      
      // Ensure all obstacles are numbered correctly after insertion
      obstacles.forEach((obstacle, index) => {
        obstacle.number = index + 1;
        obstacle.name = `${obstacle.type} ${index + 1}`;
      });

      // Create preview course layout
      const newCourse: CourseLayout = {
        id: Math.random().toString(36).substr(2, 9),
        name: `${filters.difficulty} Course`,
        description: `A ${filters.duration}-minute ${filters.courseType.toLowerCase()} course with ${filters.obstacleCount} obstacles`,
        duration: filters.duration,
        obstacleCount: filters.obstacleCount,
        difficulty: filters.difficulty,
        obstacles: obstacles,
        startPoint: { x: 5, y: 50 },
        finishPoint: { x: 95, y: 50 },
      };
      
      setCourseLayout(newCourse);
    };

    generatePreview();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<CourseFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleGenerateCourse = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      
      // Calculate water obstacles based on a ratio (1 water obstacle per 4 regular obstacles)
      const totalObstacles = filters.obstacleCount;
      const waterObstaclesCount = filters.hasWaterElements 
        ? Math.floor(totalObstacles / 4) 
        : 0;
      const regularObstaclesCount = totalObstacles - waterObstaclesCount;
      
      // Create obstacles array with numbered hurdles and water obstacles
      const obstacles = [];
      
      // Create regular hurdle obstacles with sequential numbering
      for (let i = 0; i < regularObstaclesCount; i++) {
        obstacles.push({
          id: `hurdle-${i + 1}`,
          number: i + 1, 
          type: 'Hurdle',
          shape: 'rectangle', // Hurdles are represented as rectangles
          difficulty: filters.difficulty,
          description: `Hurdle obstacle ${i + 1} to jump over`,
          position: {
            x: 10 + (i * (80 / totalObstacles)),
            y: 50 + (Math.sin(i) * 10) // Create a slight wave pattern
          }
        });
      }
      
      // Add water obstacles as blue circles
      console.log(`Total obstacles: ${totalObstacles}, Regular: ${regularObstaclesCount}, Water: ${waterObstaclesCount}`);
      if (filters.hasWaterElements) {
        console.log(`Adding ${waterObstaclesCount} water obstacles`);
        for (let i = 0; i < waterObstaclesCount; i++) {
          // Insert water obstacles at regular intervals
          const insertPosition = Math.floor((i + 1) * (regularObstaclesCount / (waterObstaclesCount + 1)));
          obstacles.splice(insertPosition, 0, {
            id: `water-${i + 1}`,
            number: insertPosition + 1,
            type: 'Water',
            shape: 'circle', // Water elements are represented as circles
            difficulty: filters.difficulty,
            description: 'Water obstacle to jump over',
            position: {
              x: 10 + (insertPosition * (80 / totalObstacles)),
              y: 50 + (Math.sin(insertPosition) * 10)
            }
          });
        }
      }
      
      // Ensure all obstacles are numbered correctly after insertion
      obstacles.forEach((obstacle, index) => {
        obstacle.number = index + 1;
      });
      
      // Simplified data for API with explicit start and finish points
      const courseData = {
        title: filters.title || `${filters.difficulty} Course`,
        description: filters.description,
        difficulty: filters.difficulty,
        water: filters.hasWaterElements,
        courseType: filters.courseType,
        isPrivate: filters.isPrivate,
        startPoint: { x: 5, y: 50 },   // Fixed starting point
        finishPoint: { x: 95, y: 50 }, // Fixed ending point
        obstacles: obstacles,
        // Ensure course has a logical flow from start to finish
        courseDirection: 'left-to-right', 
      };
      
      // Call API to generate the course
      const generatedCourse = await generateParcours(courseData);
      
      // Navigate to the newly created course
      navigate(`/parcours/${generatedCourse.id}`);
    } catch (err) {
      console.error('Error generating course:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate course');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{t('courses.generate.title') || 'Generate Parkour Course'}</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          {/* Course Details Section */}
          <div className="mb-6 p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">{t('courses.generate.details.title') || 'Course Details'}</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="course-title">
                {t('courses.generate.details.titleField') || 'Title'}
              </label>
              <input
                id="course-title"
                type="text"
                value={filters.title}
                onChange={(e) => handleFilterChange({ title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('courses.generate.details.titlePlaceholder') || 'Enter course title'}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="course-description">
                {t('courses.generate.details.descriptionField') || 'Description'}
              </label>
              <textarea
                id="course-description"
                value={filters.description}
                onChange={(e) => handleFilterChange({ description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder={t('courses.generate.details.descriptionPlaceholder') || 'Enter course description'}
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="course-private"
                type="checkbox"
                checked={filters.isPrivate}
                onChange={(e) => handleFilterChange({ isPrivate: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-gray-700" htmlFor="course-private">
                {t('courses.generate.details.privateField') || 'Make this course private'}
              </label>
            </div>
          </div>
          
          <FilterPanel filters={filters} onChange={handleFilterChange} />
          
          <div className="mt-6">
            <button 
              onClick={handleGenerateCourse}
              disabled={isGenerating}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isGenerating ? t('generator.generating') || 'Generating...' : t('generator.create') || 'Create Course'}
            </button>
            
            {error && (
              <div className="mt-3 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:w-2/3">
          {courseLayout && <CoursePreview course={courseLayout} />}
        </div>
      </div>
    </div>
  );
};

export default Generate;
