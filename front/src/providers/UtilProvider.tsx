import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type UtilContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

// contextの作成
export const UtilContext = createContext<UtilContextType>(
  {} as UtilContextType
);

export const UtilProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <UtilContext.Provider value={{ loading, setLoading }}>
      {children}
    </UtilContext.Provider>
  );
};
