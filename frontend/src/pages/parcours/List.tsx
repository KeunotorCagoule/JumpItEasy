import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { getParcoursList } from "../../services/parcourService"; // Import the service function

interface Parcours {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  difficulty: string;
  courseType: string;
  waterElements: boolean;
  private: boolean;
}

const List: React.FC = () => {
  const { t } = useLanguage();
  const [parcoursList, setParcoursList] = useState<Parcours[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const fetchParcours = async () => {
      setIsLoading(true);
      try {
        // Replace direct fetch with service function
        const data = await getParcoursList();
        const mappedData = data.map((course) => ({
          id: course.id,
          title: course.title,
          description: course.description,
          creatorId: course.creatorId,
          difficulty: course.difficulty,
          courseType: course.courseType,
          waterElements: course.waterElements,
          private: course.private,
        }));
        setParcoursList(mappedData);
      } catch (error) {
        console.error("Error fetching parcours:", error);
        setError("Failed to load courses. Please try again later."); // Set error message
      } finally {
        setIsLoading(false);
      }
    };

    fetchParcours();
  }, []);

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
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <Link to={`/parcours/${parcours.id}`}>
                <h2 className="text-xl font-semibold mb-2">{parcours.title}</h2>
                <p className="text-gray-600 mb-2">{parcours.description}</p>

                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {parcours.difficulty}
                  </span>
                  {/* <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {parcours.duration} {t('common.hours')}
                </span> */}
                </div>
                {/* 
              <div className="flex flex-wrap gap-2 mb-4">
                {parcours.topics.map(topic => (
                  <span
                    key={topic}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div> */}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
