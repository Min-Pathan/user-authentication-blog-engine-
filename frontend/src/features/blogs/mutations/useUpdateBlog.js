import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBlog } from "../../../services/blogService";

const useUpdateBlog = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateBlog,
        retry: false,
        onSuccess :()=>{
            void queryClient.invalidateQueries({
                queryKey:["blog"]
            })
            void queryClient.invalidateQueries({
                queryKey:["blogs"]
            })
        }
    })
}

export default useUpdateBlog