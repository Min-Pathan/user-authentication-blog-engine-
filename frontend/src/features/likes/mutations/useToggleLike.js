import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toggleBlogLike } from "../../../services/likeService";

const useToggleLike =(blogId, userId)=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:()=> toggleBlogLike(blogId),
        retry: false,
        onSuccess:async(response)=>{
            const queryKey = ["likes", blogId, userId];
            queryClient.setQueryData(queryKey, (previous)=>{
                if(!previous) return previous;
                return{
                    ...previous,
                    likedByCurrentUser:response.liked
                }
            })
            await Promise.all([
                queryClient.invalidateQueries({queryKey}),
                queryClient.invalidateQueries({
                    queryKey:["blog"]
                }),
                queryClient.invalidateQueries({
                    queryKey:["blogs"]
                })
            ])
        }
    })
}

export default useToggleLike;