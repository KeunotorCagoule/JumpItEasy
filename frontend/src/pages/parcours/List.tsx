import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import {
  getParcoursList,
  addParcoursToFavorites,
} from "../../services/parcourService"; // Import the service function
import { useAuth } from "../../context/AuthContext";
import { FaHeart, FaRegHeart, FaFilter } from "react-icons/fa";
import { Parcours } from "../../types/parcours";

const List: React.FC = () => {
  const { t } = useLanguage();
  const [parcoursList, setParcoursList] = useState<Parcours[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Parcours[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filter, setFilter] = useState("all"); // 'all', 'completed', 'favorites', 'not-completed'
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const toggleFavorite = async (courseId: string, event: React.MouseEvent) => {
    // Prevent clicking the heart from navigating to course detail
    event.preventDefault();
    event.stopPropagation();

    if (!isLoggedIn) return;

    try {
      await addParcoursToFavorites(courseId);
      // Toggle in the local state
      setFavorites((prev) =>
        prev.includes(courseId)
          ? prev.filter((id) => id !== courseId)
          : [...prev, courseId]
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
      setError("Failed to update favorites. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchParcours = async () => {
      setIsLoading(true);
      try {
        // Include favorites parameter when user is logged in
        const queryParams = isLoggedIn ? "?includeFavorites=true" : "";
        const data = await getParcoursList(queryParams);
        console.log("Fetched parcours data:", data);
        // Extract favorite course IDs from the response
        const favoriteIds: string[] = [];        const mappedData = data.map((course) => {
          // Check if the course has is_favorite property and it's true
          if (course.is_favorite) {
            favoriteIds.push(course.id);
          }
          console.log("Mapping course:", course);
          return {
            id: course.id,
            title: course.title,
            description: course.description,
            creatorId: course.creatorId,
            difficulty: course.difficulty,
            course_type: course.course_type, // Fixed property name
            waterElements: course.waterElements,
            private: course.private,
            is_favorite: course.is_favorite || false,
            is_completed: course.is_completed || false,
            completion_rate: course.completion_rate || 0,
            completed_at: course.completed_at,
            username: course?.username || "Unknown", // Fallback to 'Unknown' if creator is not available
          };
        });
        setParcoursList(mappedData);
        // Initialize favorites state with IDs of favorited courses
        setFavorites(favoriteIds);
        // Initialize filtered courses
        setFilteredCourses(mappedData);
      } catch (error) {
        console.error("Error fetching parcours:", error);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchParcours();
  }, [isLoggedIn]);

  // Apply filter to courses
  useEffect(() => {
    if (filter === "all") {
      setFilteredCourses(parcoursList);
    } else if (filter === "completed") {
      setFilteredCourses(
        parcoursList.filter(
          (course) =>
            course.is_completed ||
            (course.completion_rate && course.completion_rate > 0)
        )
      );
    } else if (filter === "favorites") {
      setFilteredCourses(
        parcoursList.filter(
          (course) => course.is_favorite || favorites.includes(course.id)
        )
      );
    } else if (filter === "not-completed") {
      setFilteredCourses(
        parcoursList.filter(
          (course) =>
            !course.is_completed &&
            (!course.completion_rate || course.completion_rate === 0)
        )
      );
    }
  }, [filter, parcoursList, favorites]);

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{t("courses.list.title")}</h1>
          <p className="text-gray-600">
            Discover and explore parkour courses from the community
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-4">
          {isLoggedIn && (
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
                      onClick={() => {
                        setFilter("all");
                        setShowFilterMenu(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        filter === "all"
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {t("courses.userCourses.all")}
                    </button>{" "}
                    <button
                      onClick={() => {
                        setFilter("not-completed");
                        setShowFilterMenu(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        filter === "not-completed"
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {t("courses.view.notCompleted")}
                    </button>
                    <button
                      onClick={() => {
                        setFilter("completed");
                        setShowFilterMenu(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        filter === "completed"
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {t("courses.userCourses.completed")}
                    </button>
                    <button
                      onClick={() => {
                        setFilter("favorites");
                        setShowFilterMenu(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        filter === "favorites"
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {t("courses.userCourses.favorites")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <Link
            to="/parcours/generate"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {t("courses.list.createNew")}
          </Link>
        </div>
      </div>{" "}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            {parcoursList.length === 0
              ? t("courses.list.noCourses")
              : "No courses match the current filter"}
          </p>
          {parcoursList.length === 0 && (
            <Link
              to="/parcours/generate"
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {t("courses.list.createFirst")}
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((parcours) => (
            <div
              key={parcours.id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow relative flex flex-col"
            >
              {isLoggedIn && (
                <button
                  className="absolute top-4 right-4 text-xl text-red-500 hover:text-red-600 z-10"
                  onClick={(e) => toggleFavorite(parcours.id, e)}
                >
                  {favorites.includes(parcours.id) ? (
                    <FaHeart />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
              )}
              <Link
                to={`/parcours/${parcours.id}`}
                className="flex flex-col h-full"
              >
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">
                    {parcours.title}
                  </h2>
                  <p className="text-gray-600 mb-2">{parcours.description}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    Created by {parcours.username || "Unknown"}
                  </p>{" "}                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {parcours.difficulty}
                    </span>                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
                        parcours.course_type === "1"
                          ? "bg-purple-100 text-purple-800"
                          : parcours.course_type === "2"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                      style={{ alignItems: "center" }}
                    >
                      {parcours.course_type === "1"
                        ? "Grand Prix"
                        : parcours.course_type === "2"
                        ? "Speed"
                        : "Special"}
                    </span>
                    {parcours.is_completed && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                        ✓ Completed
                      </span>
                    )}
                  </div>
                </div>                {/* Completion Progress Bar - Always show when logged in */}
                {isLoggedIn && (
                  <div className="mt-auto pt-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{parcours.completion_rate || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          (parcours.completion_rate || 0) === 0
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                        style={{ 
                          width: `${Math.max(parcours.completion_rate || 0, 4)}%`,
                          minWidth: (parcours.completion_rate || 0) === 0 ? '8px' : '0px'
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
