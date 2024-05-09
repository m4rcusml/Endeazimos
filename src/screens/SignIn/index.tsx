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
  const { top, bottom } = useSafeAreaInsets();
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
        paddingTop: top,
        paddingBottom: bottom,
      }]}
    >
      <Logo width={80} height={80} />

      <Typography size={24} weight={800}>
        Endeazimos
      </Typography>

      <View style={styles.secondaryContainer}>
        <View style={styles.fieldContainer}>
          <Textfield
            filled
            placeholder='Email'
            control={control}
            name='email'
          />
          <Typography
            children={errors.email?.message}
            alignment='right'
            color='#ff7777'
            size={12}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Textfield
            filled
            isPasswordField
            placeholder='Senha'
            control={control}
            name='password'
          />
          <Typography
            children={errors.password?.message}
            alignment='right'
            color='#ff7777'
            size={12}
          />
        </View>

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
          icon={() => <GoogleLogo height={34} width={34} />}
          style={{ alignSelf: 'center', height: 52, width: 52 }}
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
    gap: 30,
  },
  secondaryContainer: {
    width: '70%',
    gap: 15,
  },
  fieldContainer: {
    gap: 5
  }
});