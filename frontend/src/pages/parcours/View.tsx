import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getParcoursDetails, deleteParcours } from '../../services/parcourService';
import { useAuth } from '../../context/AuthContext';
import { FaTrash } from 'react-icons/fa';
import { Parcours, ParcoursBackendResponse } from '../../types/parcours';

const View: React.FC = () => {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [parcours, setParcours] = useState<Parcours | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchParcoursDetails = async () => {
      setIsLoading(true);
      try {
        if (!id) {
          throw new Error(t('courses.view.invalidId'));
        }        const data: ParcoursBackendResponse = await getParcoursDetails(id);
        console.log('Fetched parcours data:', data);
        const mappedData: Parcours = {
          id: data.id,
          title: data.title,
          description: data.description,
          creatorId: data.creator_id || '',
          difficulty: data.difficulty || 'Beginner',
          courseType: data.course_type || '1',
          waterElements: data.water_elements || false,
          private: data.private || false,
          created_at: data.created_at,
          is_favorite: data.is_favorite || false,
          username: data.username || 'Unknown',
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

  const handleDelete = async () => {
    if (!parcours || !id) return;

    const confirmDelete = window.confirm(t('courses.view.confirmDelete'));
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      await deleteParcours(id);
      navigate('/parcours/mes-parcours');
    } catch (error) {
      console.error('Error deleting parcours:', error);
      setError(t('courses.view.errorDeleting'));
    } finally {
      setIsDeleting(false);
    }
  };

  console.log('parcours:', parcours);
  console.log('user:', user);

  const isCreator = user && parcours && user.id === parcours.creatorId;
  console.log('isCreator:', isCreator);

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

        <div className="bg-white rounded-lg shadow-lg p-6">          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold">{parcours.title}</h1>
              {parcours.username && (
                <p className="text-gray-600 mt-1">
                  {t('courses.view.createdBy')}: <span className="font-medium">{parcours.username}</span>
                </p>
              )}
            </div>
            {isCreator && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <FaTrash />
                {isDeleting ? t('courses.view.deleting') : t('courses.view.delete')}
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {t('courses.view.level')}: {parcours.difficulty}
            </span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              {t('courses.view.type')}: {parcours.courseType === '1' ? 'Grand Prix' : parcours.courseType === '2' ? 'Speed' : 'Special'}
            </span>
            {parcours.waterElements && (
              <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">
                {t('courses.view.waterElements')}
              </span>
            )}
            {parcours.created_at && (
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                {t('courses.view.created')}: {new Date(parcours.created_at).toLocaleDateString()}
              </span>
            )}
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
