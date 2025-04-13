import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../store/slices/authSlice';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for existing user session on component mount
    dispatch(getCurrentUser());
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
