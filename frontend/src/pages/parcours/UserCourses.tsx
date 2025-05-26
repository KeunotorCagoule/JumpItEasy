import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getUserParcours,addParcoursToFavorites } from '../../services/parcourService';
import { FaHeart, FaRegHeart, FaFilter } from 'react-icons/fa';

interface UserCourse {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  created_at: string;
  completion_rate?: number;
  is_favorite: boolean;
  creator_id: string;
}

const UserCourses: React.FC = () => {
  const { t } = useLanguage();
  const [courses, setCourses] = useState<UserCourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<UserCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all'); // 'all', 'created', 'completed', 'favorites'
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  useEffect(() => {
    const fetchUserCourses = async () => {
      setIsLoading(true);
      try {
        const data: Partial<UserCourse>[] = await getUserParcours();
        const userCourses = data.map((course) => ({
          id: course.id || '',
          title: course.title || '',
          description: course.description || '',
          difficulty: course.difficulty || '',
          created_at: course.created_at || '',
          completion_rate: course.completion_rate,
          is_favorite: course.is_favorite || false,
          creator_id: course.creator_id || '',
        }));
        setCourses(userCourses);
        setFilteredCourses(userCourses);
      } catch (error) {
        console.error('Error fetching user courses:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserCourses();
  }, []);

  useEffect(() => {
    // Apply filter to courses
    if (filter === 'all') {
      setFilteredCourses(courses);
    } else if (filter === 'created') {
      setFilteredCourses(courses.filter(course => course.creator_id)); // Assuming creator_id exists if user created it
    } else if (filter === 'completed') {
      setFilteredCourses(courses.filter(course => course.completion_rate && course.completion_rate > 0));
    } else if (filter === 'favorites') {
      setFilteredCourses(courses.filter(course => course.is_favorite));
    }
  }, [filter, courses]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const toggleFavorite = async (courseId: string) => {
    try {
      await addParcoursToFavorites(courseId);
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === courseId ? { ...course, is_favorite: !course.is_favorite } : course
        )
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
          >
            {t("common.retry")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{t("courses.userCourses.title")}</h1>
          <p className="text-gray-600">{t("courses.userCourses.subtitle")}</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              <FaFilter />
              {t("courses.userCourses.filter")}
            </button>
            
            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  <button 
                    onClick={() => { setFilter('all'); setShowFilterMenu(false); }}
                    className={`block px-4 py-2 text-sm w-full text-left ${filter === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {t("courses.userCourses.all")}
                  </button>
                  <button 
                    onClick={() => { setFilter('created'); setShowFilterMenu(false); }}
                    className={`block px-4 py-2 text-sm w-full text-left ${filter === 'created' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {t("courses.userCourses.created")}
                  </button>
                  <button 
                    onClick={() => { setFilter('completed'); setShowFilterMenu(false); }}
                    className={`block px-4 py-2 text-sm w-full text-left ${filter === 'completed' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {t("courses.userCourses.completed")}
                  </button>
                  <button 
                    onClick={() => { setFilter('favorites'); setShowFilterMenu(false); }}
                    className={`block px-4 py-2 text-sm w-full text-left ${filter === 'favorites' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {t("courses.userCourses.favorites")}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <Link
            to="/parcours/generate"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {t("courses.list.createNew")}
          </Link>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">{t("courses.userCourses.noCoursesFound")}</p>
          <Link
            to="/parcours/generate"
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {t("courses.userCourses.createOne")}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="border rounded-lg bg-white overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <Link to={`/parcours/${course.id}`}>
                    <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">{course.title}</h2>
                  </Link>
                  
                  <button 
                    onClick={() => toggleFavorite(course.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label={course.is_favorite ? t("courses.userCourses.removeFavorite") : t("courses.userCourses.markFavorite")}
                  >
                    {course.is_favorite ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                  </button>
                </div>

                <p className="text-gray-600 mb-3 line-clamp-2">{course.description}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {course.difficulty}
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                    {formatDate(course.created_at)}
                  </span>
                </div>

                {course.completion_rate !== undefined && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{t("courses.userCourses.progress")}</span>
                      <span>{course.completion_rate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${course.completion_rate}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t px-4 py-3 bg-gray-50">
                <Link 
                  to={`/parcours/${course.id}`} 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {t("courses.list.viewDetails")} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCourses;
