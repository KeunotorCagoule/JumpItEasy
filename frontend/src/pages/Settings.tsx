import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Lock, User, Bell, Shield, Globe } from "lucide-react";
import {
  getUserSettings,
  updateUserSettings,
  changePassword,
} from "../services/userService";
import { UserSettings, PasswordChangeRequest } from "../types/user";

const Settings: React.FC = () => {
  const { isLoggedIn, username } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // États pour le formulaire de profil
  const [profileForm, setProfileForm] = useState({
    username: username || "",
    email: "user@example.com",
    bio: "",
    location: "",
  });

  // États pour le formulaire de mot de passe
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // États pour les préférences
  const [preferences, setPreferences] = useState({
    language: "fr",
    darkMode: false,
    emailNotifications: true,
    appNotifications: true,
    marketingEmails: false,
    twoFactorAuth: false,
    publicProfile: true,
  });

  useEffect(() => {
    if (isLoggedIn) {
      const fetchSettings = async () => {
        setIsLoading(true);
        try {
          const settings = await getUserSettings();

          // Mettre à jour le formulaire de profil
          setProfileForm({
            username: settings.username,
            email: settings.email,
            bio: settings.bio || "",
            location: settings.location || "",
          });

          // Mettre à jour les préférences
          setPreferences({
            language: settings.language,
            darkMode: settings.darkMode,
            emailNotifications: settings.emailNotifications,
            appNotifications: settings.appNotifications,
            marketingEmails: settings.marketingEmails,
            twoFactorAuth: settings.twoFactorAuth,
            publicProfile: settings.publicProfile,
          });
        } catch (error) {
          console.error("Erreur lors du chargement des paramètres:", error);
          setSaveMessage({
            type: "error",
            text: "Impossible de charger vos paramètres. Veuillez réessayer plus tard.",
          });
        } finally {
          setIsLoading(false);
        }
      };

      fetchSettings();
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn, username]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: checked,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage(null);

    try {
      let updatedData = {};

      // Selon l'onglet actif, préparer les données à envoyer
      if (activeTab === "profile") {
        updatedData = {
          username: profileForm.username,
          email: profileForm.email,
          bio: profileForm.bio,
          location: profileForm.location,
        };
      } else if (activeTab === "password") {
        // Vérifier que les mots de passe correspondent
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
          throw new Error("Les mots de passe ne correspondent pas");
        }

        // Changer le mot de passe via l'API
        await changePassword(passwordForm);

        // Réinitialiser le formulaire
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        setSaveMessage({
          type: "success",
          text: "Votre mot de passe a été modifié avec succès.",
        });

        setIsSaving(false);
        return;
      } else {
        // Pour les autres onglets, envoyez les préférences
        updatedData = preferences;
      }

      // Mettre à jour les paramètres via l'API
      await updateUserSettings(updatedData);

      setSaveMessage({
        type: "success",
        text: "Les modifications ont été enregistrées avec succès.",
      });
    } catch (error: any) {
      console.error("Erreur lors de l'enregistrement des paramètres:", error);
      setSaveMessage({
        type: "error",
        text:
          error.message ||
          "Une erreur est survenue lors de l'enregistrement des modifications.",
      });
    } finally {
      setIsSaving(false);

      // Faire disparaître le message après 3 secondes
      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-2xl font-bold">Paramètres du compte</h1>
          <p className="text-blue-100">
            Gérez vos informations personnelles et vos préférences
          </p>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Barre de navigation latérale */}
          <div className="md:w-64 bg-gray-50 p-6">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-md ${
                  activeTab === "profile"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <User size={18} />
                Profil
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-md ${
                  activeTab === "password"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Lock size={18} />
                Mot de passe
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-md ${
                  activeTab === "notifications"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Bell size={18} />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab("privacy")}
                className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-md ${
                  activeTab === "privacy"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Shield size={18} />
                Confidentialité
              </button>
              <button
                onClick={() => setActiveTab("preferences")}
                className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-md ${
                  activeTab === "preferences"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Globe size={18} />
                Préférences
              </button>
            </nav>
          </div>

          {/* Contenu principal */}
          <div className="flex-1 p-6">
            {saveMessage && (
              <div
                className={`mb-4 p-3 rounded-md ${
                  saveMessage.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {saveMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Onglet Profil */}
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Information du profil
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Nom d'utilisateur
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={profileForm.username}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Adresse e-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="bio"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Biographie
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        value={profileForm.bio}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Localisation
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={profileForm.location}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Onglet Mot de passe */}
              {activeTab === "password" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Modifier le mot de passe
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="currentPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Mot de passe actuel
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Confirmer le nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Onglet Notifications */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Préférences de notification
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <h3 className="font-medium">
                          Notifications par e-mail
                        </h3>
                        <p className="text-sm text-gray-500">
                          Recevoir des notifications par e-mail sur vos parcours
                          et activités
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          checked={preferences.emailNotifications}
                          onChange={handleToggleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <h3 className="font-medium">
                          Notifications de l'application
                        </h3>
                        <p className="text-sm text-gray-500">
                          Recevoir des notifications push dans l'application
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="appNotifications"
                          checked={preferences.appNotifications}
                          onChange={handleToggleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <h3 className="font-medium">E-mails marketing</h3>
                        <p className="text-sm text-gray-500">
                          Recevoir des e-mails sur les nouveautés et offres
                          spéciales
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="marketingEmails"
                          checked={preferences.marketingEmails}
                          onChange={handleToggleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Onglet Confidentialité */}
              {activeTab === "privacy" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Paramètres de confidentialité
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <h3 className="font-medium">
                          Authentification à deux facteurs
                        </h3>
                        <p className="text-sm text-gray-500">
                          Renforcer la sécurité de votre compte avec
                          l'authentification à deux facteurs
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="twoFactorAuth"
                          checked={preferences.twoFactorAuth}
                          onChange={handleToggleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <h3 className="font-medium">Profil public</h3>
                        <p className="text-sm text-gray-500">
                          Permettre aux autres utilisateurs de voir votre profil
                          et vos parcours
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="publicProfile"
                          checked={preferences.publicProfile}
                          onChange={handleToggleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Onglet Préférences */}
              {activeTab === "preferences" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Préférences générales
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="language"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Langue
                      </label>
                      <select
                        id="language"
                        name="language"
                        value={preferences.language}
                        onChange={handleSelectChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="de">Deutsch</option>
                        <option value="es">Español</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <h3 className="font-medium">Mode sombre</h3>
                        <p className="text-sm text-gray-500">
                          Activer l'interface en mode sombre
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="darkMode"
                          checked={preferences.darkMode}
                          onChange={handleToggleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Boutons de soumission */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      Enregistrement...
                    </>
                  ) : (
                    "Enregistrer les modifications"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
