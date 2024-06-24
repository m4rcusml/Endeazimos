import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export type UserType = {
  uid: string;
  photo?: string;
  name: string;
  email?: string | null;
  phoneNumber?: string;
  password?: string;
}

interface AuthContextDataType {
  isLogged: boolean;
  user?: UserType;

  logIn(data: { email: string, password: string }): Promise<any>;
  // signUp(data: UserType): Promise<boolean>;
  logOut(): Promise<void>;
  editProfile(data: Partial<UserType>): void;
  fetchUser(uid: string, email?: string | null): void;
  // updatePassword({ password, newPassword }: {
  //   password: string;
  //   newPassword: string;
  // }): boolean;
}

const AuthContext = createContext<AuthContextDataType>({} as AuthContextDataType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType>();

  async function logIn({ email, password }: { email: string, password: string }) {
    const response = await auth().signInWithEmailAndPassword(email, password);

    if (!response.user.email) return;
  }

  async function logOut() {
    Alert.alert('Sair', 'Deseja mesmo sair da sua conta?', [
      { text: 'Não' },
      {
        text: 'Sim', onPress: () => {
          auth().currentUser?.providerData[0].providerId === 'google.com'
            ?
            auth().signOut().then(() => {
              GoogleSignin.revokeAccess();
              GoogleSignin.signOut();
            })
            :
            auth().signOut();
        }
      },
    ])
  }

  function editProfile(data: Partial<UserType>) {
    firestore().collection('users').where('uid', '==', auth().currentUser?.uid).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.update(data);
      });
    }).then(() => Alert.alert('Sucesso', 'Perfil atualizado'));
  }

  function fetchUser(uid: string, email?: string) {
    firestore().collection('users').where('uid', '==', uid).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        setUser({
          ...doc.data() as {
            name: string;
            uid: string;
            photo?: string;
            phoneNumber?: string;
          },
          email: email,
        });
      });
    });
  }

  return (
    <AuthContext.Provider
      value={{
        logIn,
        isLogged: !!user,
        user,
        fetchUser,
        logOut,
        editProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  try {
    const context = useContext(AuthContext);

    return context;
  } catch {
    throw new Error('Use esse hook somente dentro do AuthProvider');
  }
}