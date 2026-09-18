import { useQuery } from "@tanstack/react-query";

import { getCommentsByBlogId } from "../../../services/commentService.js";

const useComments = (blogId) => {
  return useQuery({
    queryKey: ["comments", blogId],
    queryFn: () => getCommentsByBlogId(blogId),
    enabled: Boolean(blogId),
  });
};

export default useComments;
