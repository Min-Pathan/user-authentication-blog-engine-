import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../../services/authService";

function useForgotPassword (){
    return useMutation({
        mutationFn: forgotPassword,
        retry:false
    })
}

export default useForgotPassword