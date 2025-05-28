import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import {
  getParcoursDetails,
  deleteParcours,
  markCourseCompleted,
} from "../../services/parcourService";
import { useAuth } from "../../context/AuthContext";
import { FaTrash, FaCheckCircle, FaTimes, FaExpand } from "react-icons/fa";
import { Parcours, ParcoursBackendResponse } from "../../types/parcours";
import CoursePreview from "../../components/Generator/CoursePreview";

const View: React.FC = () => {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [parcours, setParcours] = useState<Parcours | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMarkingCompleted, setIsMarkingCompleted] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchParcoursDetails = async () => {
      setIsLoading(true);
      try {
        if (!id) {
          throw new Error(t("courses.view.invalidId"));
        }
        const data: ParcoursBackendResponse = await getParcoursDetails(id);
        console.log("Fetched parcours data:", data);        const mappedData: Parcours = {
          id: data.id,
          title: data.title,
          description: data.description,
          creatorId: data.creator_id || "",
          difficulty: data.difficulty || "Beginner",
          course_type: data.course_type || "1",
          waterElements: data.water_elements || false,
          private: data.private || false,
          created_at: data.created_at,
          is_favorite: data.is_favorite || false,
          is_completed: data.is_completed || false,
          completion_rate: data.completion_rate || 0,
          completed_at: data.completed_at,
          username: data.username || "Unknown",
          course_layout: data.course_layout,
        };

        setParcours(mappedData);
      } catch (error) {
        console.error("Error fetching parcours details:", error);
        setError(t("courses.view.errorLoading"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchParcoursDetails();
  }, [id, t]);
  const handleDelete = async () => {
    if (!parcours || !id) return;

    const confirmDelete = window.confirm(t("courses.view.confirmDelete"));
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      await deleteParcours(id);
      navigate("/parcours/mes-parcours");
    } catch (error) {
      console.error("Error deleting parcours:", error);
      setError(t("courses.view.errorDeleting"));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleMarkCompleted = async () => {
    if (!parcours || !id || !user) return;

    setIsMarkingCompleted(true);
    try {
      await markCourseCompleted(id, 100);

      // Update local state to reflect completion
      setParcours((prev) =>
        prev
          ? {
              ...prev,
              is_completed: true,
              completion_rate: 100,
              completed_at: new Date().toISOString(),
            }
          : null
      );
    } catch (error) {
      console.error("Error marking course as completed:", error);
      setError(
        t("courses.view.errorMarkingCompleted") ||
          "Error marking course as completed"
      );
    } finally {
      setIsMarkingCompleted(false);
    }
  };

  console.log("parcours:", parcours);

  const isCreator = user && parcours && user.id === parcours.creatorId;
  console.log("isCreator:", isCreator);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !parcours) {
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p>{error || t("courses.view.notFound")}</p>
            <Link
              to="/parcours"
              className="mt-2 inline-block text-blue-600 hover:underline"
            >
              {t("courses.view.backToList")}
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="mb-6">
            <Link
              to="/parcours"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              ← {t("courses.view.backToList")}
            </Link>
          </div>

          {/* Single Block Content */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Header with Title and Creator */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {parcours.title}
                </h1>
                {parcours.username && (
                  <p className="text-gray-600 flex items-center gap-2">
                    <span className="text-sm">👤</span>
                    {t("courses.view.createdBy")}:{" "}
                    <span className="font-medium">{parcours.username}</span>
                  </p>
                )}
              </div>
              {isCreator && (
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ml-4"
                >
                  <FaTrash />
                  {isDeleting
                    ? t("courses.view.deleting")
                    : t("courses.view.delete")}
                </button>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">
                {parcours.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center" style={{ alignItems: "center" }}>
                {parcours.difficulty}
                </span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center" style={{ alignItems: "center" }}>
                {parcours.course_type === "1"
                  ? "Grand Prix"
                  : parcours.course_type === "2"
                  ? "Speed"
                  : "Special"}
              </span>
              {parcours.waterElements && (
                <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium flex items-center" style={{ alignItems: "center" }}>
                  {t("courses.view.waterElements")}
                </span>
              )}
              {parcours.is_completed && (
                <span className="bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <FaCheckCircle />
                  {t("courses.view.completed")} ({parcours.completion_rate}%)
                </span>
              )}
            </div>            {/* Course Visualization */}
            <div className="mb-6">
              {parcours.course_layout ? (
                /* Show CoursePreview for generated courses with layout */
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <CoursePreview course={parcours.course_layout} />
                </div>
              ) : (
                /* Show static image for courses without layout */
                <div
                  className="relative group cursor-pointer"
                  onClick={() => setIsImageModalOpen(true)}
                >
                  <img
                    src="https://img.freepik.com/photos-gratuite/modele-souple-carte-rapport-papier_1258-167.jpg?semt=ais_items_boosted&w=740"
                    alt={parcours.title}
                    className="w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center rounded-lg">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 rounded-full p-3">
                      <FaExpand className="text-gray-700 text-xl" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Completion Status and Actions */}
            <div className="space-y-4">
              {/* Status Badges */}
              <div className="flex flex-wrap gap-2">
                {!parcours.is_completed && user && (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-full text-sm font-medium">
                    {t("courses.view.notCompleted") || "Not completed yet"}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              {user && !parcours.is_completed && (
                <button
                  onClick={handleMarkCompleted}
                  disabled={isMarkingCompleted}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
                >
                  <FaCheckCircle />
                  {isMarkingCompleted
                    ? t("courses.view.markingCompleted") ||
                      "Marking as completed..."
                    : t("courses.view.markCompleted") || "Mark as Completed"}
                </button>
              )}

              {parcours.is_completed && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                  <FaCheckCircle className="text-green-600 text-xl" />
                  <div>
                    <p className="font-medium text-green-800">
                      {t("courses.view.completedOn")}{" "}
                      {parcours.completed_at
                        ? new Date(parcours.completed_at).toLocaleDateString()
                        : ""}
                    </p>
                    <p className="text-sm text-green-600">
                      {t("courses.view.congratulations") ||
                        "Congratulations on completing this course!"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>      {/* Image Modal - only show for courses without course layout */}
      {isImageModalOpen && !parcours.course_layout && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 transition-all duration-200 shadow-lg"
            >
              <FaTimes className="text-gray-700 text-xl" />
            </button>

            {/* Image */}
            <img
              src="https://img.freepik.com/photos-gratuite/modele-souple-carte-rapport-papier_1258-167.jpg?semt=ais_items_boosted&w=740"
              alt={parcours.title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image title overlay */}
            {/* <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-60 text-white p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-1">{parcours.title}</h3>
              <p className="text-sm opacity-90">
                {t("courses.view.createdBy")}: {parcours.username || "Unknown"}
              </p>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default View;
