/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openQuestions, setOpenQuestions] = useState<number[]>([0]); // First question open by default

  const toggleQuestion = (index: number) => {
    if (openQuestions.includes(index)) {
      setOpenQuestions(openQuestions.filter((i) => i !== index));
    } else {
      setOpenQuestions([...openQuestions, index]);
    }
  };

  // FAQ data structure
  const faqSections = [
    {
      title: t("faq.general.title"),
      questions: [
        {
          question: t("faq.general.q1"),
          answer: t("faq.general.a1"),
        },
        {
          question: t("faq.general.q2"),
          answer: t("faq.general.a2"),
        },
        {
          question: t("faq.general.q3"),
          answer: t("faq.general.a3"),
        },
      ],
    },
    {
      title: t("faq.account.title"),
      questions: [
        {
          question: t("faq.account.q1"),
          answer: t("faq.account.a1"),
        },
        {
          question: t("faq.account.q2"),
          answer: t("faq.account.a2"),
        },
        {
          question: t("faq.account.q3"),
          answer: t("faq.account.a3"),
        },
      ],
    },
    {
      title: t("faq.courses.title"),
      questions: [
        {
          question: t("faq.courses.q1"),
          answer: t("faq.courses.a1"),
        },
        {
          question: t("faq.courses.q2"),
          answer: t("faq.courses.a2"),
        },
        {
          question: t("faq.courses.q3"),
          answer: t("faq.courses.a3"),
        },
        {
          question: t("faq.courses.q4"),
          answer: t("faq.courses.a4"),
        },
      ],
    },
    {
      title: t("faq.technical.title"),
      questions: [
        {
          question: t("faq.technical.q1"),
          answer: t("faq.technical.a1"),
        },
        {
          question: t("faq.technical.q2"),
          answer: t("faq.technical.a2"),
        },
      ],
    },
  ];

  // Déplacé à l'intérieur du composant pour résoudre l'erreur Fast Refresh
  const questionIndex = (() => {
    let index = 0;
    return () => index++;
  })();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
            {t("faq.title")}
          </h1>
          <p className="mt-4 text-xl text-gray-500">{t("faq.subtitle")}</p>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg divide-y divide-gray-200">
          {faqSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.questions.map((faq, i) => {
                  const currentIndex = questionIndex();
                  const isOpen = openQuestions.includes(currentIndex);

                  return (
                    <div key={i} className="border rounded-lg overflow-hidden">
                      <button
                        className="flex justify-between items-center w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none"
                        onClick={() => toggleQuestion(currentIndex)}
                      >
                        <span className="font-medium text-gray-900">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 py-3 bg-white">
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">{t("faq.notFound")}</p>
          <a
            href="mailto:support@jumpiteasy.com"
            className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            {t("faq.contactSupport")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
