import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LinearGradient } from 'expo-linear-gradient';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { GenericButton } from '@components/GenericButton';
import { Typography } from '@components/Typography';
import { Textfield } from '@components/Textfield';
import { useAuth } from '@contexts/auth';

const SignUpDataSchema = z.object({
  name: z.string({ required_error: 'Preencha este campo' })
    .min(1, 'Preencha este campo'),
  email: z.string({ required_error: 'Preencha este campo' })
    .min(1, 'Preencha este campo')
    .email('Use um email válido'),
  phoneNumber: z.string({ required_error: 'Preencha este campo' })
    .min(1, 'Preencha este campo'),
  password: z.string({ required_error: 'Preencha este campo' })
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  passwordConfirm: z.string({ required_error: 'Preencha este campo' })
    .min(1, 'Preencha este campo'),
})
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'As senhas devem ser iguais'
  });

type SignUpDataType = z.infer<typeof SignUpDataSchema>;

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId:
    '530691370256-72lnq8b3b5d84c8htkce2ovkqkkkfmnf.apps.googleusercontent.com',
});

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchUser } = useAuth();
  const { bottom } = useSafeAreaInsets();
  const { handleSubmit, control, formState: { errors } } = useForm<SignUpDataType>({
    resolver: zodResolver(SignUpDataSchema)
  });

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

                const uid = auth().currentUser?.uid;
                if(uid) {
                  fetchUser(uid, googleCredentials.user.email);
                }
              });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }
  
  async function handleCreateAccount(data: SignUpDataType) {
    try {
      setIsLoading(true);
      auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(credentials => {
          firestore()
            .collection('users')
            .add({
              name: data.name,
              phoneNumber: data.phoneNumber,
              uid: auth().currentUser?.uid,
            })
            .then(() => {
              console.log('User added!');

              const uid = auth().currentUser?.uid;
              if(uid) {
                fetchUser(uid, credentials.user.email);
              }
            });
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
            keyboardType='numeric'
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
        disabled={isLoading}
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