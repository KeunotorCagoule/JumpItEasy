import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseFilters, CourseLayout } from '../../types/course';
import { ParcoursData } from '../../types/parcours';
import FilterPanel from '../../components/Generator/FilterPanel';
import CoursePreview from '../../components/Generator/CoursePreview';
import { saveGeneratedCourse } from '../../services/parcourService';
import { useLanguage } from '../../context/LanguageContext';

const Generate: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const tailleCourseY = 75; // Valeur Y fixe pour les obstacles
  const [filters, setFilters] = useState<CourseFilters>({
    title: '',
    description: '',
    isPrivate: false,
    duration: 15,
    obstacleCount:10,
    hasWaterElements: false,
    difficulty: 'Beginner',
    equipment: 'None',
    courseType: '1',
  });  const [courseLayout, setCourseLayout] = useState<CourseLayout | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilterChange = (newFilters: Partial<CourseFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };  const handleGenerateCourse = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      
      // Validate required fields
      if (!filters.title.trim()) {
        setError(t('courses.generate.validation.titleRequired') || 'Title is required');
        setIsGenerating(false);
        return;
      }      if (!courseLayout) {
        setError(t('courses.generate.preview.generatePreviewFirst') || 'Please generate a preview first');
        setIsGenerating(false);
        return;
      }
      
      // Prepare data for API with course layout
      const courseData: ParcoursData = {
        title: filters.title,
        description: filters.description,
        difficulty: filters.difficulty,
        water: filters.hasWaterElements,
        courseType: filters.courseType,
        isPrivate: filters.isPrivate,
        course_layout: courseLayout
      };
      
      // Call API to save the generated course
      const savedCourse = await saveGeneratedCourse(courseData);
      
      // Navigate to the newly created course
      navigate(`/parcours/${savedCourse.id}`);
    } catch (err) {
      console.error('Error saving course:', err);
      setError(err instanceof Error ? err.message : 'Failed to save course');
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
                {t('courses.generate.details.titleField') || 'Title'} <span className="text-red-500">*</span>
              </label>
              <input
                id="course-title"
                type="text"
                value={filters.title}
                onChange={(e) => handleFilterChange({ title: e.target.value })}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !filters.title.trim() ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder={t('courses.generate.details.titlePlaceholder') || 'Enter course title'}
                required
              />
              {!filters.title.trim() && (
                <p className="text-red-500 text-sm mt-1">
                  {t('courses.generate.validation.titleRequired') || 'Title is required'}
                </p>
              )}
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
            <div className="mt-6 space-y-3">            {/* Generate Preview Button */}
            <button 
              onClick={async () => {
                setIsGeneratingPreview(true);
                
                // Ajouter un délai de 1 seconde pour simuler le chargement
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Regenerate preview with current filters - use same logic as useEffect
                const generatePreview = () => {
                  const totalObstacles = filters.obstacleCount;
                  const waterObstaclesCount = filters.hasWaterElements 
                    ? Math.floor(totalObstacles / 4) 
                    : 0;
                  const regularObstaclesCount = totalObstacles - waterObstaclesCount;
                  
                  // Generate random start and finish positions
                  const startPoint = { 
                    x: Math.random() * 20 + 5, // Random x between 5-25
                    y: Math.random() * tailleCourseY + 20, // Random y between 20-tailleCourseY
                    direction: Math.floor(Math.random() * 360) // Random direction 0-360°
                  };
                  
                  const finishPoint = { 
                    x: Math.random() * 20 + 75, // Random x between 75-95
                    y: Math.random() * tailleCourseY + 20, // Random y between 20-tailleCourseY
                    direction: Math.floor(Math.random() * 360) // Random direction 0-360°
                  };
                  
                  const obstacles = [];
                  const minDistance = 12; // Minimum distance between obstacles
                    // Function to check if a position is too close to existing obstacles or start/finish
                  const isTooClose = (newX: number, newY: number, existingPositions: Array<{x: number, y: number}>, startFinish: Array<{x: number, y: number}> = []) => {
                    // Check distance from other obstacles
                    const tooCloseToObstacles = existingPositions.some(pos => {
                      const distance = Math.sqrt(Math.pow(newX - pos.x, 2) + Math.pow(newY - pos.y, 2));
                      return distance < minDistance;
                    });
                    
                    // Check distance from start/finish lines (with larger minimum distance)
                    const minDistanceFromStartFinish = 20; // Larger distance from start/finish lines
                    const tooCloseToStartFinish = startFinish.some(pos => {
                      const distance = Math.sqrt(Math.pow(newX - pos.x, 2) + Math.pow(newY - pos.y, 2));
                      return distance < minDistanceFromStartFinish;
                    });
                    
                    return tooCloseToObstacles || tooCloseToStartFinish;
                  };
                  
                  // Keep track of all occupied positions and start/finish positions separately
                  const occupiedPositions: Array<{x: number, y: number}> = [];
                  const startFinishPositions: Array<{x: number, y: number}> = [
                    { x: startPoint.x, y: startPoint.y }, 
                    { x: finishPoint.x, y: finishPoint.y }
                  ];
                    // Create regular hurdle obstacles with better spacing
                  for (let i = 0; i < regularObstaclesCount; i++) {
                    let attempts = 0;
                    let position;
                    
                    // Try to find a good position that doesn't overlap
                    do {
                      position = {
                        x: Math.random() * tailleCourseY + 20, // Random x between 20-tailleCourseY (middle area)
                        y: Math.random() * tailleCourseY + 20  // Random y between 20-tailleCourseY
                      };
                      attempts++;
                    } while (isTooClose(position.x, position.y, occupiedPositions, startFinishPositions) && attempts < 50);
                    
                    obstacles.push({
                      id: `hurdle-${i + 1}`,
                      name: `Hurdle ${i + 1}`,
                      number: i + 1,
                      type: 'Hurdle', 
                      shape: 'rectangle',
                      difficulty: filters.difficulty as 'Easy' | 'Medium' | 'Hard',
                      description: `Hurdle obstacle ${i + 1} to jump over`,
                      techniques: ['Precision Jump'],
                      height: 1,
                      direction: Math.floor(Math.random() * 360), // Random direction 0-360°
                      position: position,
                      safetyNotes: ['Check landing surface']
                    });
                    
                    // Add this position to occupied positions
                    occupiedPositions.push(position);
                  }
                    // Add water obstacles with better spacing
                  if (filters.hasWaterElements) {
                    for (let i = 0; i < waterObstaclesCount; i++) {
                      let attempts = 0;
                      let position;
                      
                      // Try to find a good position that doesn't overlap
                      do {
                        position = {
                          x: Math.random() * tailleCourseY + 20, // Random x between 20-tailleCourseY (middle area)
                          y: Math.random() * tailleCourseY + 20  // Random y between 20-tailleCourseY
                        };
                        attempts++;
                      } while (isTooClose(position.x, position.y, occupiedPositions, startFinishPositions) && attempts < 50);
                      
                      const waterIndex = regularObstaclesCount + i;
                      obstacles.push({
                        id: `water-${i + 1}`,
                        name: `Water ${i + 1}`,
                        number: waterIndex + 1,
                        type: 'Water',
                        shape: 'circle',
                        difficulty: filters.difficulty as 'Easy' | 'Medium' | 'Hard',
                        description: 'Water obstacle to jump over',
                        techniques: ['Jump'],
                        height: 1,
                        position: position,
                        safetyNotes: ['Check water depth']
                      });
                      
                      // Add this position to occupied positions
                      occupiedPositions.push(position);
                    }
                  }
                  
                  // Sort obstacles by x position to maintain logical order
                  obstacles.sort((a, b) => a.position.x - b.position.x);
                  
                  // Renumber obstacles after sorting
                  obstacles.forEach((obstacle, index) => {
                    obstacle.number = index + 1;
                    obstacle.name = `${obstacle.type} ${index + 1}`;
                  });                  const newCourse = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: `${filters.difficulty} Course`,
                    description: `A ${filters.duration}-minute ${filters.courseType.toLowerCase()} course with ${filters.obstacleCount} obstacles`,
                    duration: filters.duration,
                    obstacleCount: filters.obstacleCount,
                    difficulty: filters.difficulty,
                    obstacles: obstacles,
                    startPoint: startPoint,
                    finishPoint: finishPoint,
                  };
                  
                  setCourseLayout(newCourse);
                };
                generatePreview();
                setIsGeneratingPreview(false);
              }}
              disabled={isGeneratingPreview}
              className={`w-full py-3 px-4 rounded-lg transition-colors ${
                isGeneratingPreview 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isGeneratingPreview 
                ? (t('courses.generate.preview.generating') || 'Génération en cours...') 
                : (t('courses.generate.preview.generateNew') || 'Generate Preview')
              }
            </button>
            
            {/* Save Course Button */}
            <button 
              onClick={handleGenerateCourse}
              disabled={isGenerating || !filters.title.trim() || !courseLayout}
              className={`w-full py-3 px-4 rounded-lg transition-colors ${
                !filters.title.trim() || !courseLayout
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400'
              }`}
            >
              {isGenerating ? t('courses.generate.preview.saving') || 'Saving...' : t('courses.generate.preview.save') || 'Save Course'}
            </button>
            
            {error && (
              <div className="mt-3 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>
          <div className="lg:w-2/3 relative">
          {/* Zone de prévisualisation avec effet de flou pendant le chargement */}
          <div className={`transition-all duration-300 ${isGeneratingPreview ? 'blur-sm' : ''}`}>
            {courseLayout && <CoursePreview course={courseLayout} />}
          </div>
          
          {/* Overlay de chargement */}
          {isGeneratingPreview && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-3"></div>
                <p className="text-gray-700 font-medium">{t('courses.generate.preview.generating') || 'Génération en cours...'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generate;
