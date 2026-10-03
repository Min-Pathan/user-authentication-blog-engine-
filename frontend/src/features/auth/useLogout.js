import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { logoutUser } from "../../services/authService";
import { clearCredentials } from "./authSlice";
import { clearAuth } from "./authStorage";

function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch {
      // Backend unreachable or token already invalid —
      // still finish the logout locally.
    }

    clearAuth();
    dispatch(clearCredentials());
    navigate("/login");
  }, [dispatch, navigate]);

  return logout;
}

export default useLogout;
