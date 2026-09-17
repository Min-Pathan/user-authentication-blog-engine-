import { useQuery } from "@tanstack/react-query"
import { getAllCategories } from "../../../services/categoryService"

const useCategories = () =>{
    return useQuery({
        queryKey : 'categories',
        queryFn: getAllCategories,
        staleTime: 1000 * 60 * 5
    })
}

export default useCategories;