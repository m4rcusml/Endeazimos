import { useAuth } from '@contexts/auth';
import { StackRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { isLogged } = useAuth();
  
  return (
    isLogged ? <StackRoutes /> : <AuthRoutes />
  )
}