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
  name: z.string({ required_error: 'Preencha este campo' })
    .min(1, 'Preencha este campo'),
  email: z.string({ required_error: 'Preencha este campo' })
    .min(1, 'Preencha este campo')
    .email('Use um email válido'),
  phoneNumber: z.string({ required_error: 'Preencha este campo' })
    .min(1, 'Preencha este campo'),
  password: z.string({ required_error: 'Preencha este campo' })
    .min(1, 'Preencha este campo'),
  passwordConfirm: z.string({ required_error: 'Preencha este campo' })
    .min(1, 'Preencha este campo'),
})
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'As senhas devem ser iguais'
  });

type SignUpDataType = z.infer<typeof SignUpDataSchema>;

export function SignUp() {
  const { navigate, goBack } = useNavigation<NavigationProp<AuthRoutesParams, 'signup'>>();
  const { handleSubmit, control, formState: { errors } } = useForm<SignUpDataType>({
    resolver: zodResolver(SignUpDataSchema)
  });
  const { bottom } = useSafeAreaInsets();
  const { signUp } = useAuth();

  async function handleCreateAccount(data: SignUpDataType) {
    console.log('cria conta');
    const response = await signUp(data);

    if(response) {
      goBack();
    }
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
        <View style={styles.fieldContainer}>
          <Textfield
            placeholder='Nome'
            control={control}
            name='name'
          />
          <Typography
            children={errors.name?.message}
            alignment='right'
            color='#ff7777'
            size={12}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Textfield
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
            placeholder='Telefone'
            control={control}
            name='phoneNumber'
          />
          <Typography
            children={errors.phoneNumber?.message}
            alignment='right'
            color='#ff7777'
            size={12}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Textfield
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

        <View style={styles.fieldContainer}>
          <Textfield
            isPasswordField
            placeholder='Confirmar senha'
            control={control}
            name='passwordConfirm'
          />
          <Typography
            children={errors.passwordConfirm?.message}
            alignment='right'
            color='#ff7777'
            size={12}
          />
        </View>
      </View>
      <GenericButton
        filled
        title='Confirmar'
        style={styles.confirmButton}
        onPress={handleSubmit(handleCreateAccount)}
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
    gap: 15
  },
  confirmButton: {
    position: 'absolute',
    bottom: 32,
    right: 32
  },
  fieldContainer: {
    gap: 5
  }
});