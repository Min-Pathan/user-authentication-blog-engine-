import {
  useQuery,
} from "@tanstack/react-query";

import {
  getBlogById,
} from "../../../services/blogService.js";

const useBlog = (id) => {
  return useQuery({
    queryKey: [
      "blog",
      id,
    ],

    queryFn: () =>
      getBlogById(id),

    enabled: Boolean(id),
  });
};

export default useBlog;