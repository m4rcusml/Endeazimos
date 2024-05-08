import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '@screens/SignIn';

import Logo from '@assets/logo.svg';
import { View } from 'react-native';
import { SignUp } from '@screens/SignUp';

export type AuthRoutesParams = {
  signin: undefined;
  signup: undefined;
}

const Auth = createNativeStackNavigator<AuthRoutesParams>();

export function AuthRoutes() {
  return (
    <Auth.Navigator
      screenOptions={{
      headerTitle: () => <Logo width={46} height={46} />,
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: '#125266' },
      headerTintColor: 'white',
      headerShadowVisible: false
      }}
    >
      <Auth.Screen
        name='signin'
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name='signup'
        component={SignUp}
      />
    </Auth.Navigator>
  )
}