import React from 'react';
import { CourseFilters } from '../../types/course';

interface FilterPanelProps {
  filters: CourseFilters;
  onChange: (filters: Partial<CourseFilters>) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Course Parameters</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration (minutes): {filters.duration}
          </label>
          <input
            type="range"
            min="5"
            max="60"
            value={filters.duration}
            onChange={(e) => onChange({ duration: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Obstacles: {filters.obstacleCount}
          </label>
          <input
            type="range"
            min="5"
            max="30"
            value={filters.obstacleCount}
            onChange={(e) => onChange({ obstacleCount: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Water Elements
          </label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.hasWaterElements}
              onChange={(e) => onChange({ hasWaterElements: e.target.checked })}
              className="rounded text-blue-600"
            />
            <span className="text-sm">Include water elements</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty Level
          </label>
          <select
            value={filters.difficulty}
            onChange={(e) => onChange({ difficulty: e.target.value as CourseFilters['difficulty'] })}
            className="w-full p-2 border rounded-md"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Terrain Type
          </label>
          <select
            value={filters.terrainType}
            onChange={(e) => onChange({ terrainType: e.target.value as CourseFilters['terrainType'] })}
            className="w-full p-2 border rounded-md"
          >
            <option value="Urban">Urban</option>
            <option value="Nature">Nature</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height Range
          </label>
          <select
            value={filters.heightRange}
            onChange={(e) => onChange({ heightRange: e.target.value as CourseFilters['heightRange'] })}
            className="w-full p-2 border rounded-md"
          >
            <option value="Ground Level">Ground Level</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Required Equipment
          </label>
          <select
            value={filters.equipment}
            onChange={(e) => onChange({ equipment: e.target.value as CourseFilters['equipment'] })}
            className="w-full p-2 border rounded-md"
          >
            <option value="None">None</option>
            <option value="Basic">Basic</option>
            <option value="Full Set">Full Set</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Type
          </label>
          <select
            value={filters.courseType}
            onChange={(e) => onChange({ courseType: e.target.value as CourseFilters['courseType'] })}
            className="w-full p-2 border rounded-md"
          >
            <option value="Linear">Linear</option>
            <option value="Circuit">Circuit</option>
            <option value="Freestyle">Freestyle</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Environment
          </label>
          <select
            value={filters.environment}
            onChange={(e) => onChange({ environment: e.target.value as CourseFilters['environment'] })}
            className="w-full p-2 border rounded-md"
          >
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Safety Features
          </label>
          <select
            value={filters.safetyFeatures}
            onChange={(e) => onChange({ safetyFeatures: e.target.value as CourseFilters['safetyFeatures'] })}
            className="w-full p-2 border rounded-md"
          >
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Enhanced">Enhanced</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
