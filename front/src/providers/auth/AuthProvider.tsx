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
import { fetchUserIdAndName } from "../../lib/api/user";

type currentUserType = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  currentUser: currentUserType | null | undefined;
  setCurrentUser: Dispatch<SetStateAction<currentUserType | null | undefined>>;
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
  const [currentUser, setCurrentUser] = useState<
    currentUserType | null | undefined
  >(undefined);

  useEffect(() => {
    if (user) {
      fetchUserIdAndName(user).then((userData) => {
        setCurrentUser(userData);
        console.log(userData);
      });
    }
  }, [user]);

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     setCurrentUser(user);
  //   });
  // }, [user]);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, user, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
