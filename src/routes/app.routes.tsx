import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabRoutes } from './tab.routes';

import { CampanhaProps } from '@components/CampanhaButton';
import { InstituicaoProps } from '@components/HomeSection/Item';

import { CampanhaDetails } from '@screens/CampanhaDetails';
import { Instituicao } from '@screens/Instituicao';
import { Voluntariado } from '@screens/Voluntariado';

export type StackRoutesParams = {
  main: undefined;
  instituicao: { data: InstituicaoProps }
  voluntariado: { data: InstituicaoProps },
  campanhaDetails: { data: CampanhaProps };
}

const Stack = createNativeStackNavigator<StackRoutesParams>();

export function StackRoutes() {
  return (
    <Stack.Navigator
      initialRouteName='main'
      screenOptions={{
        title: '',
        headerTintColor: 'white',
        headerShadowVisible: false,
        headerTransparent: true,
        statusBarColor: 'transparent',
        statusBarTranslucent: true,
      }}
    >
      <Stack.Screen
        name='main'
        component={TabRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='instituicao'
        component={Instituicao}
      />
      <Stack.Screen
        name='voluntariado'
        component={Voluntariado}
      />
      <Stack.Screen
        name='campanhaDetails'
        component={CampanhaDetails}
      />
    </Stack.Navigator>
  )
}