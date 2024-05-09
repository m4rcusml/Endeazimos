import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LinearGradient } from 'expo-linear-gradient';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { AuthRoutesParams } from '@routes/auth.routes';
import { useAuth } from '@contexts/auth';

import { GenericButton } from '@components/GenericButton';
import { Typography } from '@components/Typography';
import { Textfield } from '@components/Textfield';

import Logo from '@assets/logo.svg';
import GoogleLogo from '@assets/google-logo.svg';

export function NotLogged() {
  const { navigate } = useNavigation<NavigationProp<AuthRoutesParams, 'signin'>>();
  const { top, bottom } = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#125266', '#104C5F']}
      style={[styles.background, {
        paddingTop: top + 30,
        paddingBottom: bottom + 50,
      }]}
    >
      <View style={{ gap: 20 }}>
        <Logo width={64} height={64} style={{ alignSelf: 'center' }} />

        <Typography size={28} weight={800}>
          Deseja realizar seu cadastro?
        </Typography>
      </View>

      <Typography alignment='center' size={18} style={{ width: '80%', alignSelf: 'center' }}>
        Você pode prosseguir criando uma conta do zero ou a partir de seu email. 
      </Typography>

      <View style={styles.secondaryContainer}>
        <GenericButton
          filled
          title='Criar conta'
          onPress={() => navigate('signup')}
        />

        <View style={styles.ou}>
          <View style={styles.hr} />
          <Typography>OU</Typography>
          <View style={styles.hr} />
        </View>

        <GenericButton
          filled
          icon={() => <GoogleLogo height={34} width={34} />}
          style={{ height: 52 }}
          title='Continuar com o Google'
          onPress={() => {}}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigate('signin')}
        style={{ alignSelf: 'center' }}
        children={(
          <Typography>
            Já tem uma conta? Entre agora
          </Typography>
        )}
      />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    gap: 30,
  },
  secondaryContainer: {
    gap: 15,
  },
  ou: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  hr: {
    backgroundColor: 'white',
    height: 1,
    flexGrow: 1
  },
  fieldContainer: {
    gap: 5
  }
});