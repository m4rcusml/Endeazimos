import { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AuthRoutesParams } from '@routes/auth.routes';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: '530691370256-72lnq8b3b5d84c8htkce2ovkqkkkfmnf.apps.googleusercontent.com'
});

export function SignIn() {
  const { navigate } = useNavigation<NavigationProp<AuthRoutesParams, 'signin'>>();
  const { handleSubmit, control, formState: { errors } } = useForm<SignInDataType>({
    resolver: zodResolver(SignInDataSchema)
  });
  const { top, bottom } = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);

  function handleCreateAccount() {
    navigate('signup');
  }

  function loginWithGoogle() {
    setIsLoading(true);

    GoogleSignin.hasPlayServices();
    GoogleSignin.signIn()
      .then(googleCredentials => {
        auth()
          .signInWithCredential(
            auth.GoogleAuthProvider.credential(googleCredentials.idToken)
          )
          .then(async () => {
            const alreadyRegistered = await (async function verify() {
              const user = await firestore()
                .collection('users')
                .where('uid', '==', auth().currentUser?.uid)
                .get();

              return user.empty;
            })();

            if (!alreadyRegistered) return;

            firestore()
              .collection('users')
              .add({
                uid: auth().currentUser?.uid,
                name: googleCredentials.user.name,
                photo: googleCredentials.user.photo
              })
              .then(() => {
                console.log('User added!');
              });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  async function handleLogin({ email, password }: SignInDataType) {
    try {
      setIsLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
      Alert.alert('Ocorreu um erro', 'Tente novamente mais tarde.')
      setIsLoading(false);
    }
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

        <TouchableOpacity
          style={{ marginTop: -10, marginBottom: 15 }}
          children={(
            <Typography alignment='center' style={{ textDecorationLine: 'underline' }}>
              Esqueceu a senha?
            </Typography>
          )}
        />

        <GenericButton
          filled
          title='Entrar'
          onPress={handleSubmit(handleLogin)}
          disabled={isLoading}
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
          onPress={loginWithGoogle}
          disabled={isLoading}
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