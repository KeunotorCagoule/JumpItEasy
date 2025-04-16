import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Wand2 } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

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
              Design Your Perfect Jump Course
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              Create professional equestrian courses with ease using our intelligent course generator.
              Perfect for trainers, riders, and competition organizers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/parcours')}
                className="flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <List className="mr-2" />
                View Existing Courses
              </button>
              <button
                onClick={() => navigate('/parcours/generate')}
                className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Wand2 className="mr-2" />
                Generate a Course
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Intelligent Design</h3>
            <p className="text-gray-600">
              Our AI-powered generator creates balanced and challenging courses suitable for all skill levels.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Easy Customization</h3>
            <p className="text-gray-600">
              Adjust course parameters, obstacle types, and dimensions to match your specific needs.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Share & Print</h3>
            <p className="text-gray-600">
              Export your courses in multiple formats and share them with riders and organizers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
