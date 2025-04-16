import React from "react";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
            À propos de JumpItEasy
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Découvrez notre application de gestion d'entraînement pour le saut
            d'obstacles
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Notre mission
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              JumpItEasy a été créé avec une mission claire : simplifier la
              gestion des entraînements et des compétitions pour les cavaliers
              et entraîneurs de saut d'obstacles. Notre plateforme offre des
              outils intuitifs pour suivre les progrès, planifier les parcours
              et améliorer les performances.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Fonctionnalités principales
            </h2>
            <ul className="list-disc pl-6 text-lg text-gray-600 mb-6 space-y-2">
              <li>Création et gestion de parcours d'obstacles personnalisés</li>
              <li>Suivi des performances des cavaliers et des chevaux</li>
              <li>Planification d'entraînements avec objectifs spécifiques</li>
              <li>Analyse statistique des résultats en compétition</li>
              <li>
                Communauté en ligne pour partager des conseils et des parcours
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Notre équipe
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Notre équipe est composée de passionnés d'équitation et de
              technologie. Nous combinons notre expertise en développement
              logiciel avec notre connaissance approfondie du monde équestre
              pour créer une application qui répond véritablement aux besoins
              des cavaliers modernes.
            </p>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Nous contacter
              </h2>
              <p className="text-lg text-gray-600">
                Vous avez des questions ou des suggestions ? N'hésitez pas à
                nous contacter à{" "}
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
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
