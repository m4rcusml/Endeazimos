import { NavigationContainer } from '@react-navigation/native';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <NavigationContainer>
      {children}
    </NavigationContainer>
  )
}