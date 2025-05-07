import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext"; // Added import

const About: React.FC = () => {
  const { t } = useLanguage(); // Added translation hook
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
            {t("about.title")}
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            {t("about.subtitle")}
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("about.mission.title")}
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              {t("about.mission.description")}
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("about.features.title")}
            </h2>
            <ul className="list-disc pl-6 text-lg text-gray-600 mb-6 space-y-2">
              <li>{t("about.features.item1")}</li>
              <li>{t("about.features.item2")}</li>
              <li>{t("about.features.item3")}</li>
              <li>{t("about.features.item4")}</li>
              <li>{t("about.features.item5")}</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("about.team.title")}
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              {t("about.team.description")}
            </p>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {t("about.contact.title")}
              </h2>
              <p className="text-lg text-gray-600">
                {t("about.contact.description")}{" "}
                <a
                  href="mailto:contact@jumpiteasy.com"
                  className="text-blue-600 hover:text-blue-800"
                >
                  contact@jumpiteasy.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            {t("common.backToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
