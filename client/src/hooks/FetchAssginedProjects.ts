import { APIResponseProject } from "@/interfaces/apiResponseProject";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useAssignedProjects() {
  const { getToken } = useAuth(); // Clerk's auth to get token

  const query = useQuery({
    queryKey: ["assigned"],
    queryFn: () => fetchProjects(getToken),
  });

  return { ...query, projects: query.data?.data.projects ?? [] };
}

async function fetchProjects(
  getToken: () => Promise<string | null>,
): Promise<APIResponseProject> {
  // Get the session token from Clerk
  const token = await getToken();

  // Make request with token in Authorization header
  const response = await axios.get(
    `http://localhost:5000/api/v1/projects/me/assigned`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}
