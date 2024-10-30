import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/hooks/useAuth";
import { MainSpinner } from "../component/UI/MainSpinner";
import Cookies from "js-cookie";

const AuthGaurdRoute = () => {
  const { user, isLoading } = useAuth();
  const loginType = Cookies.get("login_type");

  if (isLoading) return <MainSpinner />;

  // Redirect logged-in users away from login
  if (user) {
    if (loginType === "student") {
      return <Navigate to="/student/dashboard" />;
    } else if (loginType === "academy") {
      return <Navigate to="/academy" />;
    }
  }

  return <Outlet />;
};


export default AuthGaurdRoute;