import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Bell, Ear, Globe, House, Plus, SquaresFour, User } from 'phosphor-react-native';

import { Home } from '@screens/Home';
import { Profile } from '@screens/Profile';
import { Campanhas } from '@screens/Campanhas';
import { CadastroExpandido } from '@screens/Profile/CadastroExpandido';
import { AlterarSenha } from '@screens/Profile/AlterarSenha';
import { EditProfile } from '@screens/Profile/EditProfile';
import { Contribuinte } from '@screens/Profile/Contribuinte';
import { Instituicao } from '@screens/Profile/Instituicao';
import { Forum } from '@screens/Forum';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackRoutesParams } from './app.routes';
import { useAuth } from '@contexts/auth';

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
      <Stack.Screen
        name='instituicao'
        component={Instituicao}
      />
      <Stack.Screen
        name='contribuinte'
        component={Contribuinte}
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
  const { navigate } = useNavigation<NavigationProp<StackRoutesParams>>();
  const { user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#1c7ac7',
      }}
    >
      <Tab.Screen
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <House weight='fill' size={size + 2} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='campanhas'
        component={Campanhas}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <SquaresFour weight='fill' size={size + 2} color={color} />
          ),
        }}
      />
      {user?.type === 'instituicao' && <Tab.Screen
        name='createPost'
        component={Forum}
        options={{
          tabBarButton: () => (
            <TouchableOpacity activeOpacity={0.6} style={{ width: 65 }} onPress={() => navigate('createPost')}>
              <View style={styles.createPostButton}>
                <Plus size={30} color='white' weight='bold' />
              </View>
            </TouchableOpacity>
          ),
        }}
      />}
      <Tab.Screen
        name='forum'
        component={Forum}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Globe size={size + 2} color={color} weight='fill' />
          )
        }}
      />
      <Tab.Screen
        name='profile'
        component={ProfileRoutes}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <User size={size + 2} color={color} weight='fill' />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  createPostButton: {
    width: 60,
    height: 60,
    aspectRatio: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c7ac7',
    position: 'absolute',
    left: '50%',
    bottom: 0,
    transform: [
      { translateX: -30 },
      { translateY: -20 }
    ]
  }
});