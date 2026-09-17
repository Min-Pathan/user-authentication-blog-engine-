import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";

import {
  getAllBlogs,
} from "../../../services/blogService.js";

const useBlogs = ({
   page = 1,
  limit = 6,
  keyword = "",
  categoryId = null,
}) => {
  return useQuery({
    queryKey: [
      "blogs",
      page,
      limit,
      keyword,
      categoryId
    ],

    queryFn: () =>
      getAllBlogs({
        page,
        limit,
        keyword,
        categoryId
      }),

    placeholderData:
      keepPreviousData,
  });
};

export default useBlogs;