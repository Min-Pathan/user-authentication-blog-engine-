import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteBlog } from "../../../services/blogService";

const useDeleteBlog = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteBlog,
        retry: false,
        onSuccess:(_response, deletedId)=>{
            queryClient.removeQueries({
                predicate:(query)=>{
                    const [resource, id] = query.queryKey;

                    return (
                        ["blogs", "comments", "likes"].includes(resource) && 
                        String(id) === String(deletedId)
                    )
                }
            })
            void queryClient.invalidateQueries({
                queryKey:["blogs"]
            })
        }
    })
}

export default useDeleteBlog;