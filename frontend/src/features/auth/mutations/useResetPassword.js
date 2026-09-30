import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../../services/authService";

function useResetPassword(){
    return useMutation({
        mutationFn:resetPassword,
        retry:false
    })
}

export default useResetPassword