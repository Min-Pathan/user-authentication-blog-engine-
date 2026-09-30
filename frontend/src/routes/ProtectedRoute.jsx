import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const auth = useSelector(
    (state) => state.auth,
  );

  if (!auth.isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute