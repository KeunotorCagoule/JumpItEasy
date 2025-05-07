import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { RegisterFormData } from "../../types/auth";
import CountryDropdown from "../common/CountryDropdown";
import LanguageDropdown from "../common/LanguageDropdown";
import { useLanguage } from "../../context/LanguageContext"; // Ajout de l'import

const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
    country: z.string().min(1, "Please select a country"),
    acceptTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must accept the terms and conditions"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  isLoading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading }) => {
  const { t } = useLanguage(); // Utilisation du hook de traduction
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    language: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    // Calculate password strength
    let strength = 0;
    if (formData.password.length >= 8) strength++;
    if (/[A-Z]/.test(formData.password)) strength++;
    if (/[a-z]/.test(formData.password)) strength++;
    if (/[0-9]/.test(formData.password)) strength++;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength++;
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      registerSchema.parse(formData);
      onSubmit(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t("auth.register.title")}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t("auth.register.subtitle")}
          </p>
        </div>
        <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
          {/* Username and Email on the same line */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("auth.register.username")}
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  errors.username ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder={t("auth.register.usernamePlaceholder")}
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("auth.register.email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder={t("auth.register.emailPlaceholder")}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Country and Language on the same line */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("auth.register.country")}
              </label>
              <CountryDropdown
                value={formData.country}
                onChange={handleChange}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  errors.country ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                required
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="language"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("auth.register.language")}
              </label>
              <LanguageDropdown
                value={formData.language}
                onChange={handleChange}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  errors.language ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                required
              />
              {errors.language && (
                <p className="mt-1 text-sm text-red-600">{errors.language}</p>
              )}
            </div>
          </div>

          {/* Password fields */}
          <div className="space-y-6 mt-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("auth.register.password")}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  errors.password ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder={t("auth.register.passwordPlaceholder")}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
              <div className="mt-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-full rounded ${
                        i < passwordStrength
                          ? [
                              "bg-red-500",
                              "bg-orange-500",
                              "bg-yellow-500",
                              "bg-lime-500",
                              "bg-green-500",
                            ][passwordStrength - 1]
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {t("auth.register.passwordStrength")}:{" "}
                  {t(
                    `auth.register.strength.${
                      ["veryWeak", "weak", "fair", "good", "strong"][
                        passwordStrength - 1
                      ] || "veryWeak"
                    }`
                  )}
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("auth.register.confirmPassword")}
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  errors.confirmPassword ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder={t("auth.register.confirmPasswordPlaceholder")}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center mt-8">
            <input
              id="accept-terms"
              name="acceptTerms"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={formData.acceptTerms}
              onChange={handleChange}
            />
            <label
              htmlFor="accept-terms"
              className="ml-2 block text-sm text-gray-900"
            >
              {t("auth.register.acceptTermsPrefix")}{" "}
              <Link
                to="/terms-and-conditions"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {t("auth.register.termsAndConditions")}
              </Link>
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>
          )}

          <div className="mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </span>
              ) : null}
              {t("auth.register.createAccount")}
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              {t("auth.register.alreadyHaveAccount")}{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {t("auth.register.signInHere")}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
