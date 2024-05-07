import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type AuthRoutesParams = {
  signin: undefined;
  signup: undefined;
}

const Auth = createNativeStackNavigator<AuthRoutesParams>();

export function AuthRoutes() {
  return (
    <Auth.Navigator>
      <Auth.Screen
        name='signin'
        component={() => <></>}
      />
      <Auth.Screen
        name='signup'
        component={() => <></>}
      />
    </Auth.Navigator>
  )
}