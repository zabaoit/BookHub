import useAuthStore from "../../store/useAuthStore";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { accessToken, loading } = useAuthStore();
  const [starting, setStarting] = useState(true);

  useEffect(() => {
    // Simulate initialization check
    const timer = setTimeout(() => {
      setStarting(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (starting || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  if (!accessToken) {
    return <Navigate to={"/signin"} replace />;
  }
  return <Outlet></Outlet>;
};

export default ProtectedRoute;
