import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './auth';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <NavigationContainer>
      <AuthProvider>
        {children}
      </AuthProvider>
    </NavigationContainer>
  )
}