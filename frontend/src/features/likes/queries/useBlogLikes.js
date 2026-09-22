import { useQuery } from "@tanstack/react-query"
import { getBlogLikes } from "../../../services/likeService"

const useBlogLikes = (blogId, userId, isAuthenticated)=>{
    return useQuery({
        queryKey:["likes", blogId, userId],
        queryFn:() => getBlogLikes(blogId),
        enabled:Boolean(blogId && userId &&isAuthenticated),
        retry: false
    })
}

export default useBlogLikes