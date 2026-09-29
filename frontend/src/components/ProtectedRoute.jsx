import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

function ProtectedRoute() {
    if (!isLoggedIn()) {
        return <Navigate to="/login" replace />;
    }

    // This tells React Router to render the nested routes (<DashboardLayout> and its pages)
    return <Outlet />;
}

export default ProtectedRoute;