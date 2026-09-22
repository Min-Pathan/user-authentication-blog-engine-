import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getMyBlogs } from "../../../services/blogService.js";

const useMyBlogs = ({ page = 1, limit = 6 } = {}) => {
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  return useQuery({
    queryKey: ["blogs", "mine", user?.id, page, limit],
    queryFn: () => getMyBlogs({ page, limit }),
    enabled: Boolean(isAuthenticated && user?.id),
  });
};

export default useMyBlogs;