import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getProfile } from "../../../services/profileService.js";

function useProfile() {
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  return useQuery({
    queryKey: ["profile", user?.id],
    queryFn: getProfile,
    enabled: Boolean(isAuthenticated && user?.id),
  });
}

export default useProfile;