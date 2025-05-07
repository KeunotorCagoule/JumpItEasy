import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { Mail, Phone } from "lucide-react";

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-lg font-semibold mb-4">{t("footer.company")}</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  {t("footer.aboutUs")}
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-gray-300 hover:text-white">
                  {t("footer.documentation")}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white">
                  {t("footer.faq")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-lg font-semibold mb-4">{t("footer.resources")}</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/parcours" className="text-gray-300 hover:text-white">
                  {t("footer.courses")}
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/yourorganization/jumpiteasy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-lg font-semibold mb-4">{t("footer.legal")}</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/terms-and-conditions" className="text-gray-300 hover:text-white">
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white">
                  {t("footer.privacy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information - Direct contact info instead of a link */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-lg font-semibold mb-4">{t("footer.contact")}</h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-gray-400" />
                <a href="mailto:contact@jumpiteasy.com" className="text-gray-300 hover:text-white">
                  contact@jumpiteasy.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-gray-400" />
                <a href="tel:+33123456789" className="text-gray-300 hover:text-white">
                  +33 1 23 45 67 89
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">
            © {currentYear} JumpItEasy. {t("footer.allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
