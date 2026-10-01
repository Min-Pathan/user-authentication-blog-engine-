import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../../services/profileService.js";

function useUpdateProfile(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    retry: false,
    onSuccess: (response) => {
      queryClient.setQueryData(["profile", userId], response);

      // Blog and comment responses also contain the username.
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
}

export default useUpdateProfile;