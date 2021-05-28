import { ChakraProvider } from "@chakra-ui/react";

import "./App.css";
import { SignUp } from "./components/pages/auth/SignUp";
import theme from "./theme/theme";

function App() {
  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <SignUp />
      </ChakraProvider>
    </div>
  );
}

export default App;
