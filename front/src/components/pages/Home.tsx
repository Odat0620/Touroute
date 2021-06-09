import { Box, Heading } from "@chakra-ui/layout";
import { useContext, VFC } from "react";
import { LoginUserContext } from "../../providers/LoginUserProvider";

export const Home: VFC = () => {
  const { isSignedIn, currentUser } = useContext(LoginUserContext);
  return (
    <Box>
      <Heading as="h1">Home</Heading>
      {isSignedIn && currentUser ? (
        <>
          <h2>Email: {currentUser?.email}</h2>
          <h2>Name: {currentUser?.name}</h2>
        </>
      ) : (
        <h2>ログインしていません</h2>
      )}
    </Box>
  );
};
