import React from "react";
import { useLanguage } from "../context/LanguageContext";

const PrivacyPolicy: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
            {t("privacy.title")}
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            {t("privacy.lastUpdated")}: 01/02/2024
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6 prose lg:prose-lg max-w-none">
            <h2>{t("privacy.introduction")}</h2>
            <p>{t("privacy.introductionText")}</p>
            
            <h2>{t("privacy.informationCollection")}</h2>
            <p>{t("privacy.informationCollectionText")}</p>
            <ul>
              <li><strong>{t("privacy.personalInfo.title")}:</strong> {t("privacy.personalInfo.text")}</li>
              <li><strong>{t("privacy.usage.title")}:</strong> {t("privacy.usage.text")}</li>
              <li><strong>{t("privacy.cookies.title")}:</strong> {t("privacy.cookies.text")}</li>
            </ul>
            
            <h2>{t("privacy.dataUse")}</h2>
            <p>{t("privacy.dataUseText")}</p>
            <ul>
              <li>{t("privacy.dataUseList.item1")}</li>
              <li>{t("privacy.dataUseList.item2")}</li>
              <li>{t("privacy.dataUseList.item3")}</li>
              <li>{t("privacy.dataUseList.item4")}</li>
            </ul>
            
            <h2>{t("privacy.dataSharing")}</h2>
            <p>{t("privacy.dataSharingText")}</p>
            
            <h2>{t("privacy.dataSecurity")}</h2>
            <p>{t("privacy.dataSecurityText")}</p>
            
            <h2>{t("privacy.thirdPartyLinks")}</h2>
            <p>{t("privacy.thirdPartyLinksText")}</p>
            
            <h2>{t("privacy.childrenPrivacy")}</h2>
            <p>{t("privacy.childrenPrivacyText")}</p>
            
            <h2>{t("privacy.changes")}</h2>
            <p>{t("privacy.changesText")}</p>
            
            <h2>{t("privacy.contact")}</h2>
            <p>{t("privacy.contactText")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
