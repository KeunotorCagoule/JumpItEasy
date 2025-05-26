import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { getParcoursList, addParcoursToFavorites } from "../../services/parcourService"; // Import the service function
import { useAuth } from '../../context/AuthContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface Parcours {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  difficulty: string;
  courseType: string;
  waterElements: boolean;
  private: boolean;
  is_favorite?: boolean; // Add this property to track favorite status
}

const List: React.FC = () => {
  const { t } = useLanguage();
  const [parcoursList, setParcoursList] = useState<Parcours[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = async (courseId: string, event: React.MouseEvent) => {
    // Prevent clicking the heart from navigating to course detail
    event.preventDefault();
    event.stopPropagation();

    if (!isLoggedIn) return;

    try {
      await addParcoursToFavorites(courseId);
      // Toggle in the local state
      setFavorites(prev => 
        prev.includes(courseId) 
          ? prev.filter(id => id !== courseId) 
          : [...prev, courseId]
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
      setError("Failed to update favorites. Please try again later.");
    }
  }

  useEffect(() => {
    const fetchParcours = async () => {
      setIsLoading(true);
      try {
        // Include favorites parameter when user is logged in
        const queryParams = isLoggedIn ? '?includeFavorites=true' : '';
        const data = await getParcoursList(queryParams);
        console.log("Fetched parcours data:", data);
        // Extract favorite course IDs from the response
        const favoriteIds: string[] = [];
        
        const mappedData = data.map((course) => {
          // Check if the course has is_favorite property and it's true
          if (course.is_favorite) {
            favoriteIds.push(course.id);
          }
          
          return {
            id: course.id,
            title: course.title,
            description: course.description,
            creatorId: course.creatorId,
            difficulty: course.difficulty,
            courseType: course.courseType,
            waterElements: course.waterElements,
            private: course.private,
            is_favorite: course.is_favorite || false
          };
        });
        
        setParcoursList(mappedData);
        // Initialize favorites state with IDs of favorited courses
        setFavorites(favoriteIds);
      } catch (error) {
        console.error("Error fetching parcours:", error);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchParcours();
  }, [isLoggedIn]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Add error handling in the UI
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("courses.list.title")}</h1>
        <Link
          to="/parcours/generate"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {t("courses.list.createNew")}
        </Link>
      </div>

      {parcoursList.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">{t("courses.list.noCourses")}</p>
          <Link
            to="/parcours/generate"
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {t("courses.list.createFirst")}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {parcoursList.map((parcours) => (
            <div
              key={parcours.id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow relative"
            >
              {isLoggedIn && (
                <button
                  className="absolute top-4 right-4 text-xl text-red-500 hover:text-red-600 z-10"
                  onClick={(e) => toggleFavorite(parcours.id, e)}
                >
                  {favorites.includes(parcours.id) ? <FaHeart /> : <FaRegHeart />}
                </button>
              )}
              <Link to={`/parcours/${parcours.id}`}>
                <h2 className="text-xl font-semibold mb-2">{parcours.title}</h2>
                <p className="text-gray-600 mb-2">{parcours.description}</p>

                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {parcours.difficulty}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
