import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  MaterialCommunityIcons,
  FontAwesome6,
  Foundation,
  Octicons,
  MaterialIcons
} from '@expo/vector-icons';

import { Home } from '@screens/Home';
import { Campanhas } from '@screens/Campanhas';
import { Profile } from '@screens/Profile';

const App = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#1c7ac7'
      }}
    >
      <App.Screen
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            focused
              ? <Foundation name='home' size={size + 1} color={color} />
              : <Octicons name='home' size={size - 1} color={color} />
          )
        }}
      />
      <App.Screen
        name='campanhas'
        component={Campanhas}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name={focused ? 'widgets' : 'widgets-outline'} size={size} color={color} />
          )
        }}
      />
      <App.Screen
        name='notifications'
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons name={focused ? 'notifications' : 'notifications-none'} size={size + 2} color={color} />
          )
        }}
      />
      <App.Screen
        name='profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome6 name={focused ? 'user-large' : 'user'} size={focused ? size - 6 : size - 4} color={color} />
          )
        }}
      />
    </App.Navigator>
  )
}