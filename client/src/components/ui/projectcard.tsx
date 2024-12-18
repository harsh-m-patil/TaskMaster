import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IProject } from "@/interfaces/project";
import { motion } from "motion/react";
import { ProjectModal } from "./ProjectModal";

export const ProjectCard = ({ project }: { project: IProject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  return (
    <>
      {/* Card */}
      <motion.div
        className="border p-3 rounded-xl min-h-fit flex flex-col justify-between shadow-lg"
        initial={{ opacity: 0.8, scale: 0.8 }}
        animate={{ opacity: 1.0, scale: 1.0 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="bg-blue-100 p-1 sm:p-2 rounded-lg h-full">
          <div className="flex justify-between">
            <p className="text-lg sm:text-xl">{project.title}</p>
            <span
              className={`p-2 border shadow rounded-lg ${getStatusColor(
                project.status,
              )}`}
            >
              {project.status}
            </span>
          </div>
          <div className="p-2">
            <p>
              {project.description?.slice(
                0,
                project.description.length < 10 ? 10 : 15,
              ) || "No description given"}
              ...
            </p>
            <p>{project.deadline?.toString()}</p>
            <p>{project.createdByUserName}</p>
          </div>
        </div>
        <div className="p-2 flex justify-between place-items-center">
          <Button
            onClick={() => setIsModalOpen(true)} // Open modal
            variant="outline"
            className="bg-green-100 text-green-900"
          >
            Details
          </Button>
          <p>{project.totalTasks}</p>
        </div>
      </motion.div>

      {/* Modal */}
      <ProjectModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

// Function to dynamically get the status color
function getStatusColor(status: string | undefined) {
  if (status === "Completed") {
    return "bg-green-100 text-green-900";
  } else if (status === "In Progress") {
    return "bg-yellow-100 text-yellow-900";
  } else if (status === "Assigned") {
    return "bg-purple-100 text-purple-900";
  } else {
    return "bg-gray-100 text-gray-900";
  }
}
