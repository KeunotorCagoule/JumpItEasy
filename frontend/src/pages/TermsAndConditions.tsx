import React from "react";
import { useLanguage } from "../context/LanguageContext";

const TermsAndConditions: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
            {t("terms.title")}
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            {t("terms.lastUpdated")}: 01/02/2024
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6 prose lg:prose-lg max-w-none">
            <h2>{t("terms.acceptance")}</h2>
            <p>{t("terms.acceptanceText")}</p>
            
            <h2>{t("terms.services")}</h2>
            <p>{t("terms.servicesText")}</p>
            
            <h2>{t("terms.userAccounts")}</h2>
            <p>{t("terms.userAccountsText1")}</p>
            <p>{t("terms.userAccountsText2")}</p>
            
            <h2>{t("terms.content")}</h2>
            <p>{t("terms.contentText1")}</p>
            <p>{t("terms.contentText2")}</p>
            
            <h2>{t("terms.intellectualProperty")}</h2>
            <p>{t("terms.intellectualPropertyText")}</p>
            
            <h2>{t("terms.prohibitedActivities")}</h2>
            <p>{t("terms.prohibitedActivitiesText")}</p>
            <ul>
              <li>{t("terms.prohibitedList.item1")}</li>
              <li>{t("terms.prohibitedList.item2")}</li>
              <li>{t("terms.prohibitedList.item3")}</li>
              <li>{t("terms.prohibitedList.item4")}</li>
              <li>{t("terms.prohibitedList.item5")}</li>
            </ul>
            
            <h2>{t("terms.disclaimer")}</h2>
            <p>{t("terms.disclaimerText")}</p>
            
            <h2>{t("terms.limitation")}</h2>
            <p>{t("terms.limitationText")}</p>
            
            <h2>{t("terms.changes")}</h2>
            <p>{t("terms.changesText")}</p>
            
            <h2>{t("terms.contact")}</h2>
            <p>{t("terms.contactText")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
