import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser, clearError, supabase } from '../../store/slices/authSlice';
import { useLocation } from 'react-router';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Check if we're on login or register page
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    if (isAuthPage) {
      // Clear any auth errors when on login or register pages
      dispatch(clearError());
    } else {
      // Check for existing user session on component mount
      dispatch(getCurrentUser());
    }

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      if (!isAuthPage) {
        dispatch(getCurrentUser());
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch, location.pathname]);

  return <>{children}</>;
};

export default AuthProvider;
