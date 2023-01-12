
import { Redirect, Route } from 'react-router-dom';
import { getCurrentUser } from '../services/authservice';

const ProtectedRoute = (props) => {
    const user = getCurrentUser();

    if (!user) {
        //toast.error('User not authenticated !');
        return <Redirect to={{
            pathname: '/signin',
            state: { from: props.location }
        }} />
    }

    return <Route {...props} />;
}

export default ProtectedRoute;