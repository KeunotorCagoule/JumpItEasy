import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Wand2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="relative">
      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/parcours')}
                className="flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <List className="mr-2" />
                {t('home.hero.viewCourses')}
              </button>
              <button
                onClick={() => navigate('/parcours/generate')}
                className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Wand2 className="mr-2" />
                {t('home.hero.generateCourse')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">{t('home.features.intelligentDesign.title')}</h3>
            <p className="text-gray-600">
              {t('home.features.intelligentDesign.description')}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">{t('home.features.easyCustomization.title')}</h3>
            <p className="text-gray-600">
              {t('home.features.easyCustomization.description')}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">{t('home.features.shareAndPrint.title')}</h3>
            <p className="text-gray-600">
              {t('home.features.shareAndPrint.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
