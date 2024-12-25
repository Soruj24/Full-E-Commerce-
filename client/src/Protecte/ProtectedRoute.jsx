import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectCurrentToken } from '../features/auth/authSlice';

const ProtectedRoute = ({ children }) => {
    const token = useSelector(selectCurrentToken);
    console.log("protected route token", token);

    if (!token) {
        return <Navigate to="/login" replace />;
    }


    return children ? children : <Outlet />;
};

export default ProtectedRoute;
