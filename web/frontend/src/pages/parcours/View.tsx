import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface Step {
  title: string;
  description: string;
  duration: number;
}

interface Parcours {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: number;
  topics: string[];
  steps: Step[];
}

const View: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [parcours, setParcours] = useState<Parcours | null>(null);

  useEffect(() => {
    const fetchParcoursDetails = async () => {
      try {
        const response = await fetch(`/api/parcours/${id}`);
        if (response.ok) {
          const data = await response.json();
          setParcours(data);
        }
      } catch (error) {
        console.error('Error fetching parcours details:', error);
      }
    };

    fetchParcoursDetails();
  }, [id]);

  if (!parcours) {
    return (
      <div className="text-center py-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/parcours" className="text-blue-500 hover:underline">
            ← Back to List
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{parcours.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              Level: {parcours.level}
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              Duration: {parcours.duration}h
            </span>
          </div>

          <p className="text-gray-700 mb-6">{parcours.description}</p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Topics</h2>
            <div className="flex flex-wrap gap-2">
              {parcours.topics.map(topic => (
                <span
                  key={topic}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Learning Path</h2>
            <div className="space-y-4">
              {parcours.steps.map((step, index) => (
                <div
                  key={index}
                  className="border rounded p-4"
                >
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    Estimated time: {step.duration}h
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Start Learning
            </button>
            <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50">
              Save for Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
