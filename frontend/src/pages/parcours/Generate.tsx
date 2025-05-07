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
    terrainType: 'Urban',
    heightRange: 'Ground Level',
    equipment: 'None',
    courseType: '1',
    environment: 'Outdoor',
    safetyFeatures: 'Standard'
  });

  const [courseLayout, setCourseLayout] = useState<CourseLayout | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Generate preview based on filters
    const generatePreview = () => {
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

    generatePreview();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<CourseFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleGenerateCourse = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      
      // Simplified data for API
      const courseData = {
        title: filters.title || `${filters.difficulty} Course`,
        description: filters.description,
        difficulty: filters.difficulty,
        water: filters.hasWaterElements,
        courseType: filters.courseType,
        isPrivate: filters.isPrivate,
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
