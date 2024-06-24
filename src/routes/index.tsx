import { useState } from 'react';
import { StackRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useAuth } from '@contexts/auth';

export function Routes() {
  const { isLogged, fetchUser } = useAuth();

  auth().onAuthStateChanged(user => {
    if(user) {
      fetchUser(user.uid, user.email);
    }
  });

  return isLogged ? <StackRoutes /> : <AuthRoutes />
}