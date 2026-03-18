import { Navigate, Outlet } from "react-router";
import useAuthStore from "../../store/useAuthStore";

const AdminRoute = () => {
  const { accessToken, isInitialized, loading, user } = useAuthStore();

  if (!isInitialized || loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  if (!accessToken) {
    return <Navigate to="/signin" replace />;
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
