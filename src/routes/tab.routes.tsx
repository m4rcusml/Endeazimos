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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CadastroExpandido } from '@screens/Profile/CadastroExpandido';
import { AlterarSenha } from '@screens/Profile/AlterarSenha';
import { EditProfile } from '@screens/Profile/EditProfile';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function CadastroExpandidoRoutes() {
  return (
    <Stack.Navigator
      initialRouteName='start'
      screenOptions={{
        title: '',
        headerTintColor: 'white',
        headerShadowVisible: false,
        headerTransparent: true,
        statusBarColor: 'transparent',
        statusBarTranslucent: true,
        animation: 'ios'
      }}
    >
      <Stack.Screen
        name='start'
        component={CadastroExpandido}
      />
    </Stack.Navigator>
  )
}

function ProfileRoutes() {
  return (
    <Stack.Navigator
      initialRouteName='init'
      screenOptions={{
        title: '',
        headerTintColor: 'white',
        headerShadowVisible: false,
        headerTransparent: true,
        statusBarColor: 'transparent',
        statusBarTranslucent: true,
        animation: 'ios'
      }}
    >
      <Stack.Screen
        name='init'
        component={Profile}
      />
      <Stack.Screen
        name='cadastroExpandido'
        component={CadastroExpandidoRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='alterarSenha'
        component={AlterarSenha}
      />
      <Stack.Screen
        name='editProfile'
        component={EditProfile}
      />
    </Stack.Navigator>
  )
}

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
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name={focused ? 'widgets' : 'widgets-outline'} size={size} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name='notifications'
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons name={focused ? 'notifications' : 'notifications-none'} size={size + 2} color={color} />
          )
        }}
      /> */}
      <Tab.Screen
        name='profile'
        component={ProfileRoutes}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome6 name={focused ? 'user-large' : 'user'} size={focused ? size - 6 : size - 4} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}