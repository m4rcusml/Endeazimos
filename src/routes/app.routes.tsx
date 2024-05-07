import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const App = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <App.Navigator>
      <App.Screen
        name='home'
        component={() => <></>}
      />
    </App.Navigator>
  )
}