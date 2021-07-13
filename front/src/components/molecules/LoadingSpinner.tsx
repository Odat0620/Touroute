import { VFC } from "react";
import { Center, Spinner } from "@chakra-ui/react";

export const LoadingSpinner: VFC = () => {
  return (
    <>
      <Center h="80vh">
        <Spinner />
      </Center>
    </>
  );
};
