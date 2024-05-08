import { StyleSheet, View } from 'react-native';
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

const SignUpDataSchema = z.object({
  email: z.string({ required_error: 'Preencha este campo' })
    .min(1, 'Preencha este campo')
    .email('Use um email válido'),
  password: z.string({ required_error: 'Preencha este campo' })
    .min(1, 'Preencha este campo'),
});

type SignUpDataType = z.infer<typeof SignUpDataSchema>;

export function SignUp() {
  const { navigate } = useNavigation<NavigationProp<AuthRoutesParams, 'signup'>>();
  const { handleSubmit, control, formState: { errors } } = useForm<SignUpDataType>({
    resolver: zodResolver(SignUpDataSchema)
  });
  const { bottom } = useSafeAreaInsets();
  const { signUp } = useAuth();

  function handleCreateAccount() {
    console.log('cria conta');
  }

  return (
    <LinearGradient
      colors={['#125266', '#104C5F']}
      style={[styles.background, { paddingBottom: bottom }]}
    >

      <Typography size={32} weight={800}>
        Crie sua conta
      </Typography>

      <View style={styles.inputsContainer}>
        <Textfield placeholder='Nome' />
        <Textfield placeholder='Email' />
        <Textfield placeholder='Telefone' />

        <Textfield placeholder='Senha' />
        <Textfield placeholder='Confirmar senha' />

      </View>
      <GenericButton
        filled
        title='Confirmar'
        style={styles.confirmButton}
        onPress={handleCreateAccount}
      />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    gap: 50,
    paddingHorizontal: 32,
    paddingTop: 30
  },
  inputsContainer: {
    gap: 25
  },
  confirmButton: {
    position: 'absolute',
    bottom: 32,
    right: 32
  }
});