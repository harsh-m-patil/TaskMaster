import { APIResponseUser } from "@/interfaces/apiResponseUser";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useFetchedUsers() {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return { ...query, users: query.data?.data.users ?? [] };
}

async function fetchUsers(): Promise<APIResponseUser> {
  // Make request with token in Authorization header
  const response = await axios.get(`http://localhost:5000/api/v1/users`);

  return response.data;
}
