import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteComment, updateComment } from "../../../services/commentService";

const useCommentActions  = (blogId) =>{
    const queryClient = useQueryClient();
    const editMutation = useMutation({
        mutationFn: updateComment,
        retry: false,
        onSuccess:()=>{
            void queryClient.invalidateQueries({
                queryKey:["comments", blogId]
            })
        }
    })
    const deleteMutation = useMutation({
        mutationFn: deleteComment,
        retry:false,
        onSuccess: ()=>{
            void queryClient.invalidateQueries({
                queryKey:["comments", blogId]
            })
             void queryClient.invalidateQueries({
        queryKey: ["blog"],
      });

      void queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
        }
    })
    return {editMutation, deleteMutation};
}

export default useCommentActions

