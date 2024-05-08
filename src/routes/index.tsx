import { useAuth } from '@contexts/auth';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { isLogged } = useAuth();
  
  return (
    isLogged ? <AppRoutes /> : <AuthRoutes />
  )
}