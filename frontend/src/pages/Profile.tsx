import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { User, Edit, Star, Calendar, Award, MapPin } from "lucide-react";
import { getUserProfile, getUserRecentCourses } from "../services/userService";
import { UserProfile } from "../types/user";
import { Parcours } from "../types/parcours";
import { useLanguage } from "../context/LanguageContext"; // Added import

const Profile: React.FC = () => {
  const { isLoggedIn, username } = useAuth();
  const { t } = useLanguage(); // Added translation hook
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recentCourses, setRecentCourses] = useState<Parcours[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchProfileData = async () => {
        setIsLoading(true);
        try {
          // Récupérer les données du profil depuis l'API
          const profileData = await getUserProfile();
          setUserProfile(profileData);

          // Récupérer les parcours récents depuis l'API
          const coursesData = await getUserRecentCourses();
          setRecentCourses(coursesData);
        } catch (err) {
          console.error("Erreur lors de la récupération des données:", err);
          setError(
            t("profile.errorLoading")
          );
        } finally {
          setIsLoading(false);
        }
      };

      fetchProfileData();
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn, t]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
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

  // Si aucun profil n'est récupéré, mais qu'on est connecté, utiliser les données par défaut
  const defaultProfile = {
    id: "1",
    username: username || t("common.user"),
    email: "user@example.com",
    bio: t("profile.defaultBio"),
    country: t("common.countries.france"),
    joinedDate: t("profile.joinedDate"),
    favoriteCourses: 0,
    completedCourses: 0,
    createdCourses: 0,
  };

  const profile = userProfile || defaultProfile;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* En-tête du profil */}
        <div className="bg-blue-600 dark:bg-blue-800 text-white p-6">
          <div className="flex flex-col md:flex-row items-center md:justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="bg-white dark:bg-gray-700 rounded-full p-3">
                <User size={40} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{profile.username}</h1>
                <p className="text-blue-100">{profile.email}</p>
              </div>
            </div>
            <Link
              to="/settings"
              className="flex items-center gap-2 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-gray-600"
            >
              <Edit size={18} />
              {t("profile.editProfile")}
            </Link>
          </div>
        </div>

        {/* Corps du profil */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Informations personnelles */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">{t("profile.information")}</h2>

                {profile.bio && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("profile.bio")}</h3>
                    <p className="mt-1">{profile.bio}</p>
                  </div>
                )}

                {profile.country && (
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin size={16} className="text-gray-400 dark:text-gray-300" />
                    <span>{profile.country}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400 dark:text-gray-300" />
                  <span>{t("profile.memberSince")} {profile.joinedDate}</span>
                </div>
              </div>

              {/* Statistiques */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
                <h2 className="text-lg font-semibold mb-4">{t("profile.statistics")}</h2>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded">
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-yellow-500" />
                      <span>{t("profile.favoriteCourses")}</span>
                    </div>
                    <span className="font-semibold">
                      {profile.favoriteCourses}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded">
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-green-500" />
                      <span>{t("profile.completedCourses")}</span>
                    </div>
                    <span className="font-semibold">
                      {profile.completedCourses}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-blue-500" />
                      <span>{t("profile.createdCourses")}</span>
                    </div>
                    <span className="font-semibold">
                      {profile.createdCourses}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Parcours récents */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">{t("profile.recentCourses")}</h2>

              {recentCourses.length > 0 ? (
                <div className="space-y-4">
                  {recentCourses.map((course) => (
                    <div
                      key={course.id}
                      className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            <Link
                              to={`/parcours/${course.id}`}
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              {course.title}
                            </Link>
                          </h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                              {course.difficulty}
                            </span>                            <span>{course.created_at ? new Date(course.created_at).toLocaleDateString() : 'N/A'}</span>
                          </div>
                        </div>
                        {course.completion_rate !== undefined && (
                          <div className="text-right">
                            <div className="inline-flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-gray-700 dark:text-gray-300">
                              <span className="text-sm">
                                {course.completion_rate}% {t("profile.completed")}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">
                    {t("profile.noCourses")}
                  </p>
                  <Link
                    to="/parcours/generate"
                    className="mt-4 inline-block bg-blue-600 dark:bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-900"
                  >
                    {t("profile.createCourse")}
                  </Link>
                </div>
              )}

              <div className="mt-6 text-center">
                <Link to="/parcours/mes-parcours" className="text-blue-600 dark:text-blue-400 hover:underline">
                  {t("profile.viewAllOwnCourses")} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
