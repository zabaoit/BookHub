import useAuthStore from "../../store/useAuthStore";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { accessToken, loading, isInitialized } = useAuthStore();
  console.log("accessToken in ProtectedRoute:", accessToken);
  // Đợi initAuth() hoàn thành trước
  if (!isInitialized || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Sau khi initialized, kiểm tra accessToken
  if (!accessToken) {
    return <Navigate to={"/signin"} replace />;
  }

  return <Outlet></Outlet>;
};

export default ProtectedRoute;

