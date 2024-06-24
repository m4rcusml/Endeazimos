import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { AuthRoutesParams } from '@routes/auth.routes';

import { GenericButton } from '@components/GenericButton';
import { Typography } from '@components/Typography';

import Logo from '@assets/logo.svg';
import GoogleLogo from '@assets/google-logo.svg';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId:
    '530691370256-72lnq8b3b5d84c8htkce2ovkqkkkfmnf.apps.googleusercontent.com',
});

export function NotLogged() {
  const [isLoading, setIsLoading] = useState(false);
  const { navigate } = useNavigation<NavigationProp<AuthRoutesParams, 'signin'>>();
  const { top, bottom } = useSafeAreaInsets();

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
          onPress={loginWithGoogle}
          disabled={isLoading}
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