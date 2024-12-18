/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IProject } from "@/interfaces/project";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectModalProps {
  project: IProject | null; // Pass project data
  isOpen: boolean; // Modal open/close state
  onClose: () => void; // Function to close the modal
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [loading, setLoading] = useState<boolean>(false); // For loading state
  const [error, setError] = useState<string | null>(null); // For error handling

  const handleStatusChange = async (newStatus: string) => {
    if (!project?._id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/projects/${project._id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update status.");
      }

      alert(`Status updated to ${newStatus}`);
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCompletion = async () => {
    if (
      !project?._id ||
      (project.completedTasks ?? 0) >= (project.totalTasks ?? 0)
    ) {
      alert("All tasks are already completed.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/projects/${project._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update tasks.");
      }

      alert("Task marked as completed!");
      onClose();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl leading-none"
              aria-label="Close"
            >
              &times;
            </button>

            <div className="mb-6 text-center">
              <motion.h2
                className="text-3xl font-bold text-gray-800"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {project.title}
              </motion.h2>
              <p className="text-gray-500 mt-1">Project Details</p>
            </div>

            <div className="space-y-4">
              <div className="text-gray-700">
                <h3 className="font-semibold text-gray-800">Description</h3>
                <p className="mt-1 text-gray-600">{project.description}</p>
              </div>

              {project.assignedTo && project.assignedTo === assignee && (
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Modify Project
                  </h4>
                  <div className="mt-2 flex gap-4">
                    <button
                      onClick={() => handleStatusChange("Completed")}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      disabled={loading}
                    >
                      Mark as Completed
                    </button>
                    <button
                      onClick={handleTaskCompletion}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      disabled={loading}
                    >
                      Complete a Task
                    </button>
                  </div>
                </div>
              )}

              {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 rounded-lg text-gray-600 hover:text-gray-800"
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
