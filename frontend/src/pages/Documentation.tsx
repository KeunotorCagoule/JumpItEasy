import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const Documentation: React.FC = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("gettingStarted");
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
            {t("docs.title")}
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            {t("docs.subtitle")}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-md sticky top-24">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveSection("gettingStarted")}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    activeSection === "gettingStarted"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {t("docs.menu.gettingStarted")}
                </button>
                <button
                  onClick={() => setActiveSection("courseCreation")}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    activeSection === "courseCreation"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {t("docs.menu.courseCreation")}
                </button>
                <button
                  onClick={() => setActiveSection("safetyGuidelines")}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    activeSection === "safetyGuidelines"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {t("docs.menu.safetyGuidelines")}
                </button>
                <button
                  onClick={() => setActiveSection("techniques")}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    activeSection === "techniques"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {t("docs.menu.techniques")}
                </button>
                <button
                  onClick={() => setActiveSection("api")}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    activeSection === "api"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {t("docs.menu.api")}
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow-md prose lg:prose-lg max-w-none">
              {activeSection === "gettingStarted" && (
                <div>
                  <h2>{t("docs.gettingStarted.title")}</h2>
                  <p>{t("docs.gettingStarted.introduction")}</p>
                  
                  <h3>{t("docs.gettingStarted.account.title")}</h3>
                  <p>{t("docs.gettingStarted.account.text")}</p>
                  
                  <h3>{t("docs.gettingStarted.navigation.title")}</h3>
                  <p>{t("docs.gettingStarted.navigation.text")}</p>
                  
                  <h3>{t("docs.gettingStarted.firstCourse.title")}</h3>
                  <p>{t("docs.gettingStarted.firstCourse.text")}</p>
                </div>
              )}
              
              {activeSection === "courseCreation" && (
                <div>
                  <h2>{t("docs.courseCreation.title")}</h2>
                  <p>{t("docs.courseCreation.introduction")}</p>
                  
                  <h3>{t("docs.courseCreation.generator.title")}</h3>
                  <p>{t("docs.courseCreation.generator.text")}</p>
                  
                  <h3>{t("docs.courseCreation.manual.title")}</h3>
                  <p>{t("docs.courseCreation.manual.text")}</p>
                  
                  <h3>{t("docs.courseCreation.sharing.title")}</h3>
                  <p>{t("docs.courseCreation.sharing.text")}</p>
                </div>
              )}
              
              {activeSection === "safetyGuidelines" && (
                <div>
                  <h2>{t("docs.safety.title")}</h2>
                  <p>{t("docs.safety.introduction")}</p>
                  
                  <h3>{t("docs.safety.preparation.title")}</h3>
                  <p>{t("docs.safety.preparation.text")}</p>
                  
                  <h3>{t("docs.safety.environment.title")}</h3>
                  <p>{t("docs.safety.environment.text")}</p>
                  
                  <h3>{t("docs.safety.equipment.title")}</h3>
                  <p>{t("docs.safety.equipment.text")}</p>
                </div>
              )}
              
              {activeSection === "techniques" && (
                <div>
                  <h2>{t("docs.techniques.title")}</h2>
                  <p>{t("docs.techniques.introduction")}</p>
                  
                  <h3>{t("docs.techniques.basic.title")}</h3>
                  <p>{t("docs.techniques.basic.text")}</p>
                  
                  <h3>{t("docs.techniques.intermediate.title")}</h3>
                  <p>{t("docs.techniques.intermediate.text")}</p>
                  
                  <h3>{t("docs.techniques.advanced.title")}</h3>
                  <p>{t("docs.techniques.advanced.text")}</p>
                </div>
              )}
              
              {activeSection === "api" && (
                <div>
                  <h2>{t("docs.api.title")}</h2>
                  <p>{t("docs.api.introduction")}</p>
                  
                  <h3>{t("docs.api.authentication.title")}</h3>
                  <p>{t("docs.api.authentication.text")}</p>
                  
                  <h3>{t("docs.api.endpoints.title")}</h3>
                  <p>{t("docs.api.endpoints.text")}</p>
                  
                  <h3>{t("docs.api.examples.title")}</h3>
                  <p>{t("docs.api.examples.text")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
