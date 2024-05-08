import { createContext, useContext, useState } from "react";

type UserType = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

interface AuthContextDataType {
  isLogged: boolean;
  user?: UserType;

  logIn(data: { email: string, password: string }): Promise<boolean>;
  signUp(data: UserType): Promise<boolean>;
}

const AuthContext = createContext<AuthContextDataType>({} as AuthContextDataType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType>();

  async function logIn(data: { email: string, password: string }) {
    console.log('login => ', data);

    setUser(data as UserType);

    return true;
  }

  async function signUp(data: UserType) {
    console.log('cadastro => ', data);

    return true;
  }

  return (
    <AuthContext.Provider
      value={{
        isLogged: !!user,
        user,
        logIn,
        signUp
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