import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Lock, User, Trash2 } from "lucide-react";
import {
  getUserSettings,
  updateUserSettings,
  changePassword,
  deleteAccount,
} from "../services/userService";
import CountryDropdown from "../components/common/CountryDropdown";
import { useLanguage } from "../context/LanguageContext";

const Settings: React.FC = () => {
  const { isLoggedIn, username, logout } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  // États pour le formulaire de profil
  const [profileForm, setProfileForm] = useState({
    username: username || "",
    email: "user@example.com",
    bio: "",
    country: "",
  });

  // États pour stocker les valeurs originales du profil
  const [originalProfileForm, setOriginalProfileForm] = useState({
    username: username || "",
    email: "user@example.com",
    bio: "",
    country: "",
  });

  // États pour le formulaire de mot de passe
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isLoggedIn) {
      const fetchSettings = async () => {
        setIsLoading(true);
        try {
          const settings = await getUserSettings();

          // Créer les objets de données pour le profil
          const profileData = {
            username: settings.username,
            email: settings.email,
            bio: settings.bio || "",
            country: settings.country || "",
          };

          // Mettre à jour le formulaire de profil et sa copie originale
          setProfileForm(profileData);
          setOriginalProfileForm(profileData);
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
          country: profileForm.country,
        };
      } else if (activeTab === "password") {
        // Vérifier que les mots de passe correspondent
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
          throw new Error(t("settings.passwordError"));
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
          text: t("settings.passwordChanged"),
        });

        setIsSaving(false);
        return;
      }

      // Mettre à jour les paramètres via l'API
      await updateUserSettings(updatedData);

      setSaveMessage({
        type: "success",
        text: t("settings.saved"),
      });
    } catch (error: unknown) {
      console.error("Erreur lors de l'enregistrement des paramètres:", error);
      setSaveMessage({
        type: "error",
        text: error instanceof Error ? error.message : t("settings.error"),
      });
    } finally {
      setIsSaving(false);

      // Faire disparaître le message après 3 secondes
      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
    }
  };

  // Fonction pour annuler les modifications
  const handleCancelChanges = () => {
    if (activeTab === "profile") {
      setProfileForm({ ...originalProfileForm });
    } else if (activeTab === "password") {
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }

    // Rediriger vers la page /profile
    navigate("/profile");
  };

  // Fonction pour gérer la suppression du compte
  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "SUPPRIMER" && deleteConfirmation !== "DELETE") {
      setSaveMessage({
        type: "error",
        text: t("settings.typeDeleteToConfirm"),
      });
      return;
    }

    setIsDeleting(true);
    try {
      await deleteAccount();
      setSaveMessage({
        type: "success",
        text: t("settings.accountDeleted"),
      });
      
      // Déconnexion et redirection vers la page d'accueil
      setTimeout(() => {
        logout();
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error deleting account:", error);
      setSaveMessage({
        type: "error",
        text: t("settings.deleteAccountError"),
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setDeleteConfirmation("");
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
          <h1 className="text-2xl font-bold">{t("settings.title")}</h1>
          <p className="text-blue-100">{t("settings.subtitle")}</p>
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
                {t("settings.profile")}
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
                {t("settings.password")}
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
                    {t("settings.profileInfo")}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {t("settings.username")}
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
                        {t("settings.email")}
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
                        {t("settings.bio")}
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
                      <CountryDropdown
                        value={profileForm.country}
                        onChange={handleProfileChange}
                        label={t("settings.country")}
                        id="country"
                        name="country"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Onglet Mot de passe */}
              {activeTab === "password" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    {t("settings.changePassword")}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="currentPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {t("settings.currentPassword")}
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
                        {t("settings.newPassword")}
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
                        {t("settings.confirmNewPassword")}
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
                </div>              )}

              {/* Section de suppression de compte - danger zone */}


              {/* Boutons de soumission */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancelChanges}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  {t("common.cancel")}
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
                      {t("common.saving")}
                    </>
                  ) : (
                    t("common.save")
                  )}
                </button>
              </div>
            </form>            {/* Section de suppression de compte */}
            <div className="mt-8 p-6 border border-red-200 rounded-lg bg-red-50">
              <h2 className="text-xl font-semibold text-red-800 mb-2">
                {t("settings.deleteAccountWarning")}
              </h2>
              <h3 className="text-lg font-medium text-red-700 mb-3">
                {t("settings.deleteAccount")}
              </h3>
              <p className="text-sm text-red-600 mb-4">
                {t("settings.deleteAccountDescription")}
              </p>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
              >
                <Trash2 size={18} />
                {t("settings.deleteAccount")}
              </button>
            </div>
          </div>
        </div>
      </div>{/* Modal de confirmation de suppression */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              {t("settings.confirmDeleteTitle")}
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              {t("settings.confirmDeleteWarning")}
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("settings.typeDeleteToConfirm")}
              </label>
              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder={t("settings.deleteConfirmationPlaceholder")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeleteConfirmation("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                disabled={isDeleting}
              >
                {t("common.cancel")}
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isDeleting || deleteConfirmation === ""}
              >
                {isDeleting ? t("common.deleting") : t("common.delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
