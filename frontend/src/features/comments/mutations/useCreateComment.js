import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createComment } from "../../../services/commentService";

const useCreateComment = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createComment,
        retry:false,
        onSuccess:(_data, variables)=>{
            void queryClient.invalidateQueries({
                queryKey:["comments", variables.blog_id]
            })

            void queryClient.invalidateQueries({
                queryKey:["blogs"]
            })
              // Covers both normal and infinite blog lists.
      void queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
        }
    })
}

export default useCreateComment