import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext'; // Added import

interface Parcours {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: number;
  topics: string[];
}

const List: React.FC = () => {
  const { t } = useLanguage(); // Added translation hook
  const [parcoursList, setParcoursList] = useState<Parcours[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchParcours = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/parcours');
        if (response.ok) {
          const data = await response.json();
          setParcoursList(data);
        }
      } catch (error) {
        console.error('Error fetching parcours:', error);
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('courses.list.title')}</h1>
        <Link
          to="/parcours/generate"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {t('courses.list.createNew')}
        </Link>
      </div>

      {parcoursList.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">{t('courses.list.noCourses')}</p>
          <Link
            to="/parcours/generate"
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {t('courses.list.createFirst')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {parcoursList.map(parcours => (
            <div
              key={parcours.id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{parcours.title}</h2>
              <p className="text-gray-600 mb-2">{parcours.description}</p>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {parcours.level}
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {parcours.duration} {t('common.hours')}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {parcours.topics.map(topic => (
                  <span
                    key={topic}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <Link
                to={`/parcours/${parcours.id}`}
                className="text-blue-500 hover:underline"
              >
                {t('courses.list.viewDetails')}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
