import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBlog } from "../../../services/blogService";

const useCreateBlog =()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createBlog, retry: false,
        onSuccess:()=>{
            void queryClient.invalidateQueries({
                queryKey:["blogs"]
            })
        }
    })
}

export default useCreateBlog;