// frontend/src/router/ProtectRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectRoute = () => {
  const user = useSelector((state) => state.session.user);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Render child routes if the user is authenticated
};

export default ProtectRoute;
