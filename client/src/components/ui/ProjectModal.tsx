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
  const [assignee, setAssignee] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // For loading state
  const [error, setError] = useState<string | null>(null); // For error handling

  const handleAssign = async () => {
    console.log(project?._id);
    if (!assignee.trim() || !project?._id) {
      alert("Please enter a valid name.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/projects/${project._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: assignee.trim() }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to assign user.");
      }

      // Successfully assigned
      alert(`Successfully assigned to ${assignee.trim()}`);
      setAssignee(""); // Clear input
      onClose(); // Close modal
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
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
          {/* Modal Container */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl leading-none"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Header */}
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

            {/* Body */}
            <div className="space-y-4">
              {project.description && (
                <div className="text-gray-700">
                  <h3 className="font-semibold text-gray-800">Description</h3>
                  <p className="mt-1 text-gray-600">{project.description}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-800">Created By</h4>
                  <p className="mt-1 text-gray-600">
                    {project.createdByUserName}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Deadline</h4>
                  <p className="mt-1 text-gray-600">
                    {new Date(project.deadline).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Status</h4>
                  <p className="mt-1 text-gray-600">
                    {project.status ?? "Pending"}
                  </p>
                </div>

                {/* Assigned To Section */}
                <div className="col-span-2">
                  <h4 className="font-semibold text-gray-800">Assigned To</h4>
                  {project.assignedTo ? (
                    <p className="mt-1 text-gray-600">{project.assignedTo}</p>
                  ) : (
                    <div className="mt-2">
                      <input
                        type="text"
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                        placeholder="Enter assignee name"
                        className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none transition-all shadow-inner"
                        disabled={loading}
                      />
                      <button
                        onClick={handleAssign}
                        className={`mt-3 px-5 py-2 rounded-lg shadow ${
                          loading
                            ? "bg-gray-400 text-white"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        } transition-all`}
                        disabled={loading}
                      >
                        {loading ? "Assigning..." : "Assign"}
                      </button>
                      {error && (
                        <p className="text-red-500 mt-2 text-sm">{error}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Tasks */}
                {project.totalTasks !== undefined && (
                  <div className="col-span-2">
                    <h4 className="font-semibold text-gray-800">Tasks</h4>
                    <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                      <motion.div
                        className="bg-blue-500 h-4 rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            ((project.completedTasks ?? 0) /
                              project.totalTasks) *
                            100
                          }%`,
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    </div>
                    <p className="text-gray-600 mt-1">
                      {project.completedTasks ?? 0} / {project.totalTasks} Tasks
                      Completed
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-4">
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 rounded-lg text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all"
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
