import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";

export type UserType = {
  picture?: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

interface AuthContextDataType {
  isLogged: boolean;
  user?: UserType;

  logIn(data: { email: string, password: string }): Promise<any>;
  signUp(data: UserType): Promise<boolean>;
  logOut(): Promise<void>;
  editProfile(data: {
    name: string;
    email: string;
    phoneNumber: string;
  }): void;
}

const Users: UserType[] = [];

const AuthContext = createContext<AuthContextDataType>({} as AuthContextDataType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType>();

  async function logIn(data: { email: string, password: string }) {
    let founded = false;

    console.log(Users)

    for (let i = 0; i < Users.length; i++) {
      const user = Users[i];

      if (user.email === data.email) {
        if (user.password === data.password) {
          setUser({
            ...user
          });
          founded = true;
        }
      }
    }

    if (!founded) return Alert.alert('Não foi possível entrar', 'Email/senha está incorreto ou essa conta não existe.');
  }

  async function signUp(data: UserType) {
    Users.push(data);

    return true;
  }

  async function logOut() {
    setUser(undefined);
  }

  function editProfile({ name, email, phoneNumber }: { name: string, email: string, phoneNumber: string }) {
    const currentUser = Users.find(_user => _user.email === user?.email);

    if (currentUser) {
      const newData: UserType = {
        ...currentUser,
        name: name || currentUser.name,
        email: email ||currentUser.email,
        phoneNumber: phoneNumber || currentUser.phoneNumber,
      }

      setUser(newData);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isLogged: !!user,
        user,
        logIn,
        logOut,
        signUp,
        editProfile
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