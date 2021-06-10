import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../utils/Firebase";

type AuthContextType = {
  currentUser: firebase.User | null | undefined;
  setCurrentUser: Dispatch<SetStateAction<firebase.User | null | undefined>>;
  user: firebase.User | null | undefined;
  loading: boolean;
  error: firebase.auth.Error | undefined;
};

// contextの作成
export const AuthContext = createContext<AuthContextType>({
  currentUser: undefined,
} as AuthContextType);

export const AuthProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [user, loading, error] = useAuthState(auth);
  const [currentUser, setCurrentUser] =
    useState<firebase.User | null | undefined>(undefined);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, user, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
