import React from "react";
import { CourseFilters } from "../../types/course";
import { useLanguage } from "../../context/LanguageContext";

interface FilterPanelProps {
  filters: CourseFilters;
  onChange: (filters: Partial<CourseFilters>) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onChange }) => {
  const { t } = useLanguage();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : type === "number"
        ? parseFloat(value)
        : value;

    onChange({ [name]: newValue } as Partial<CourseFilters>);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {t("courses.generate.filters.title")}
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            {t("courses.generate.filters.duration")}
          </label>
          <input
            type="range"
            name="duration"
            min="10"
            max="120"
            step="5"
            value={filters.duration}
            onChange={handleChange}
            className="w-full opacity-60 cursor-not-allowed"
            disabled={true}
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>10 min</span>
            <span>{filters.duration} min</span>
            <span>120 min</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            {t("courses.generate.filters.obstacleCount")}
          </label>
          <input
            type="range"
            name="obstacleCount"
            min="5"
            max="15"
            step="1"
            value={filters.obstacleCount}
            onChange={handleChange}
            className="w-full opacity-60 cursor-pointer"
            // className="w-full opacity-60 cursor-not-allowed"
            // disabled={true}
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>5</span>
            <span>{filters.obstacleCount}</span>
            <span>15</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("courses.generate.filters.difficulty")}
          </label>
          <select
            name="difficulty"
            value={filters.difficulty}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="hasWaterElements"
              checked={filters.hasWaterElements}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              {t("courses.generate.filters.hasWaterElements")}
            </span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            {t("courses.generate.filters.equipment")}
          </label>
          <select
            name="equipment"
            value={filters.equipment}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
            disabled={true}
          >
            <option value="None">None</option>
            <option value="Basic">Basic</option>
            <option value="Full Set">Full Set</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("courses.generate.filters.courseType")}
          </label>
          <select
            name="courseType"
            value={filters.courseType}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="1">{t('courses.generate.filters.parcoursType.item1')}</option>
            <option value="2">{t('courses.generate.filters.parcoursType.item2')}</option>
            <option value="3">{t('courses.generate.filters.parcoursType.item3')}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
