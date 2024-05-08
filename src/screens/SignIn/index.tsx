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

const SignInDataSchema = z.object({
  email: z.string({ required_error: 'Preencha este campo' })
    .min(1, 'Preencha este campo')
    .email('Use um email válido'),
  password: z.string({ required_error: 'Preencha este campo' })
    .min(1, 'Preencha este campo'),
});

type SignInDataType = z.infer<typeof SignInDataSchema>;

export function SignIn() {
  const { navigate } = useNavigation<NavigationProp<AuthRoutesParams, 'signin'>>();
  const { handleSubmit, control, formState: { errors } } = useForm<SignInDataType>({
    resolver: zodResolver(SignInDataSchema)
  });
  const { top, bottom, left, right } = useSafeAreaInsets();
  const { logIn } = useAuth();

  function handleCreateAccount() {
    navigate('signup');
  }

  async function handleLogin(data: SignInDataType) {
    logIn(data);
  }

  return (
    <LinearGradient
      colors={['#125266', '#104C5F']}
      style={[styles.background, {
        paddingTop: top + 30,
        paddingBottom: bottom,
        paddingLeft: left,
        paddingRight: right
      }]}
    >
      <Logo width={80} height={80} />

      <Typography size={24} weight={800}>
        Endeazimos
      </Typography>

      <View style={styles.secondaryContainer}>
        <Textfield
          filled
          placeholder='Email'
          control={control}
          name='email'
        />
        <Typography
          children={errors.email?.message}
          style={styles.errors}
          alignment='right'
          color='#ff7777'
          size={12}
        />

        <Textfield
          filled
          placeholder='Senha'
          control={control}
          name='password'
        />
        <Typography
          children={errors.password?.message}
          style={styles.errors}
          alignment='right'
          color='#ff7777'
          size={12}
        />

        <TouchableOpacity children={(
          <Typography alignment='center'>
            Esqueceu a senha?
          </Typography>
        )} />

        <GenericButton
          filled
          title='Entrar'
          onPress={handleSubmit(handleLogin)}
        />
      </View>

      <Typography size={20}>
        ou
      </Typography>

      <View style={styles.secondaryContainer}>
        <GenericButton title='Criar conta' onPress={handleCreateAccount} />
        <GenericButton
          filled
          icon={() => <GoogleLogo height={34} width={32} />}
          style={{ alignSelf: 'center', height: 56, width: 56 }}
          onPress={() => {}}
        />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 50,
  },
  secondaryContainer: {
    width: '70%',
    gap: 25,
  },
  errors: {
    marginTop: -20,
  }
});