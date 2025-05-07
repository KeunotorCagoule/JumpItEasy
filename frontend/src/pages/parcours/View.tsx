import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext'; // Added import
import { getParcoursDetails } from '../../services/parcourService'; // Added import for parcourService

interface Parcours {
  id: string;
  title: string;
  description: string;
  level: string;
}

const View: React.FC = () => {
  const { t } = useLanguage(); // Added translation hook
  const { id } = useParams<{ id: string }>();
  const [parcours, setParcours] = useState<Parcours | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParcoursDetails = async () => {
      setIsLoading(true);
      try {
        if (!id) {
          throw new Error(t('courses.view.invalidId'));
        }
        const data = await getParcoursDetails(id);
        const mappedData: Parcours = {
          id: data.id,
          title: data.title,
          description: data.description,
          level: data.description || 'Beginner', // Provide default values if necessary
        };
        
        setParcours(mappedData);
      } catch (error) {
        console.error('Error fetching parcours details:', error);
        setError(t('courses.view.errorLoading'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchParcoursDetails();
  }, [id, t]);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !parcours) {
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p>{error || t('courses.view.notFound')}</p>
            <Link
              to="/parcours"
              className="mt-2 inline-block text-blue-600 hover:underline"
            >
              {t('courses.view.backToList')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/parcours" className="text-blue-500 hover:underline">
            ← {t('courses.view.backToList')}
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{parcours.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              {t('courses.view.level')}: {parcours.level}
            </span>
          </div>

          <p className="text-gray-700 mb-6">{parcours.description}</p>

          <div className="flex gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              {t('courses.view.startLearning')}
            </button>
            <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50">
              {t('courses.view.saveForLater')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
