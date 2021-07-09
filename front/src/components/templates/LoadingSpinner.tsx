import { Center, Spinner } from "@chakra-ui/react";
import { useContext } from "react";
import { ReactNode, VFC } from "react";
import { UtilContext } from "../../providers/UtilProvider";

type Props = {
  children: ReactNode;
};

export const LoadingSpinner: VFC<Props> = (props) => {
  const { children } = props;
  const { loading } = useContext(UtilContext);

  return (
    <>
      {loading ? (
        <Center h="80vh">
          <Spinner />
        </Center>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
