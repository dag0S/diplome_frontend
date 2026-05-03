import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/users/users.service";

export const useProfile = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => usersService.getProfile(),
  });
  
  return { user, isLoading };
};
