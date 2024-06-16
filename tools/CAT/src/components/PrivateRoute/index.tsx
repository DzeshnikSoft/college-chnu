import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '@/app/apis/authenticate';

const PrivateRoute = () => {
	return isAuthenticated() ? <Outlet /> : <Navigate to='/authenticate' />;
};

export default PrivateRoute;
