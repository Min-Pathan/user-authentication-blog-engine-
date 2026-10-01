import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getDashboard } from "../../services/dashboardService";

function useDashboard(){
    const {user, isAuthenticated } = useSelector((state)=> state.auth);

    return useQuery({
        queryKey: ["blogs", "dashboard", user?.id],
        queryFn:getDashboard,
        enabled: Boolean(user?.id) && isAuthenticated 
    })
}

export default useDashboard