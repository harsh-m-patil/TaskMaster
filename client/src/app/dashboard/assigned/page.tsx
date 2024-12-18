"use client";
import { useState } from "react";
import { CreateProjectModal } from "@/components/ui/CreateProjectModal";
import { ProjectCard } from "@/components/ui/projectcard";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useAssignedProjects } from "@/hooks/FetchAssginedProjects";

const Page = () => {
  const { projects, isLoading, refetch } = useAssignedProjects();
  const [isModalOpen, setModalOpen] = useState(false);
  const { getToken } = useAuth();

  const handleCreateProject = async (data: {
    title: string;
    description?: string;
    deadline: Date;
  }) => {
    try {
      // Fetch the Clerk token
      const token = await getToken();

      // Send POST request with the token in Authorization header
      await axios.post(
        "http://localhost:5000/api/v1/projects",
        {
          title: data.title,
          description: data.description,
          deadline: data.deadline,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Close the modal and refresh the project list
      setModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full p-6 col-span-7">
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-3xl">Assigned Projects</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            New Project
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 col-span-7 bg-gradient-to-t from-sky-50 to-white">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-3xl">Assigned Projects</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          New Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </div>
  );
};

export default Page;
