import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";

import "./App.css";
import { Router } from "./router/Router";
import theme from "./theme/theme";
import { auth } from "./utils/Firebase";
import { fetchUserData } from "./lib/api/User";
import { signInUserState } from "./store/auth";

function App() {
  const [currentUser, setCurrentUser] = useRecoilState(signInUserState);
  const resetStatus = useResetRecoilState(signInUserState);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        if (!currentUser.id) {
          fetchUserData(authUser).then((userData) => {
            setCurrentUser({
              id: userData.id,
              email: authUser.email,
              name: userData.name,
              profile: userData.profile,
              location: userData.location,
              uid: authUser.uid,
              avatar: userData.avatar,
            });
          });
        }
      } else {
        resetStatus();
      }
    });

    return () => {
      unSub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
