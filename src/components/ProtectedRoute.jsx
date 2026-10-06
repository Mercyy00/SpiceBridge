import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {

    const { user, isLoggedIn } = useAuth();


    // User is not logged in
    if (!isLoggedIn) {

        return <Navigate to="/login" replace />;

    }


    // Check user's role
    if (
        allowedRoles &&
        !allowedRoles.includes(user.role)
    ) {

        return <Navigate to="/" replace />;

    }


    // User is allowed
    return children;
}

export default ProtectedRoute;