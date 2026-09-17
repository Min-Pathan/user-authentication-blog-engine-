import {
  useInfiniteQuery,
} from "@tanstack/react-query";

import {
  getAllBlogs,
} from "../../../services/blogService.js";

const useInfiniteBlogs = ({
  limit = 6,
  keyword = "",
  categoryId = null,
}) => {
  return useInfiniteQuery({
    queryKey: [
      "blogs",
      "infinite",
      limit,
      keyword,
      categoryId,
    ],

    queryFn: ({
      pageParam,
    }) =>
      getAllBlogs({
        page: pageParam,
        limit,
        keyword,
        categoryId,
      }),

    initialPageParam: 1,

    getNextPageParam: (
      lastPage,
    ) => {
      if (
        lastPage.page <
        lastPage.totalPages
      ) {
        return (
          lastPage.page + 1
        );
      }

      return undefined;
    },
  });
};

export default useInfiniteBlogs;