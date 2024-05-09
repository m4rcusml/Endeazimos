import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  MaterialCommunityIcons,
  FontAwesome6,
  Foundation,
  Octicons,
  MaterialIcons
} from '@expo/vector-icons';

import { Home } from '@screens/Home';
import { Profile } from '@screens/Profile';
import { Campanhas } from '@screens/Campanhas';

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#1c7ac7'
      }}
    >
      <Tab.Screen
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
      <Tab.Screen
        name='campanhas'
        component={Campanhas}
        options={{
          // title: '',
          // headerTintColor: 'white',
          // headerTitleAlign: 'center',
          // headerShadowVisible: false,
          // headerStyle: { backgroundColor: '#125266' },
          // headerTitleStyle: { fontSize: 28, fontWeight: 600 },
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name={focused ? 'widgets' : 'widgets-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='notifications'
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons name={focused ? 'notifications' : 'notifications-none'} size={size + 2} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome6 name={focused ? 'user-large' : 'user'} size={focused ? size - 6 : size - 4} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}