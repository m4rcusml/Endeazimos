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
  updatePassword({ password, newPassword }: {
    password: string;
    newPassword: string;
  }): boolean;
}

let Users: UserType[] = [
  {
    email: 'fmarcus549@gmail.com',
    password: 'senha123',
    name: 'm4rcusml',
    phoneNumber: '(92) 99902 9920',
    picture: 'https://github.com/m4rcusml.png'
  }
];

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
        email: email || currentUser.email,
        phoneNumber: phoneNumber || currentUser.phoneNumber,
      }

      setUser(newData);
    }
  }

  function updatePassword({ password, newPassword }: { password: string, newPassword: string }) {
    const currentUser = Users.find(_user => _user.email === user?.email);

    if (currentUser && user) {
      if (currentUser.password === password) {
        const newData: UserType = {
          ...currentUser,
          password: newPassword || currentUser.password,
        }

        setUser(newData);

        Users = Users.filter(oldUser => oldUser.email !== user?.email);
        Users.push(user);
        
        return true;
      }
    }

    return false;
  }

  return (
    <AuthContext.Provider
      value={{
        isLogged: !!user,
        user,
        logIn,
        logOut,
        signUp,
        editProfile,
        updatePassword
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