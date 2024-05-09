import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '@screens/SignIn';

import Logo from '@assets/logo.svg';
import { SignUp } from '@screens/SignUp';
import { NotLogged } from '@screens/NotLogged';

export type AuthRoutesParams = {
  initial: undefined;
  signin: undefined;
  signup: undefined;
}

const Auth = createNativeStackNavigator<AuthRoutesParams>();

export function AuthRoutes() {
  return (
    <Auth.Navigator
      initialRouteName='initial'
      screenOptions={{
        headerTitle: () => <Logo width={46} height={46} />,
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#125266' },
        headerTintColor: 'white',
        headerShadowVisible: false,
        statusBarColor: 'transparent',
        statusBarTranslucent: true,
        animation: 'ios'
      }}
    >
      <Auth.Screen
        name='initial'
        component={NotLogged}
        options={{ headerShown: false }}
      />
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