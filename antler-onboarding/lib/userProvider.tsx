import { createContext, useContext, ReactNode, useState } from "react";

type userContextType = {
  id: string;
  email: string;
  setData: (email: string, id: string) => void;
};

const userContextDefaultValues: userContextType = {
  id: "",
  email: "",
  setData: (email, id) => {},
};
const UserContext = createContext<userContextType>(userContextDefaultValues);

export function useUser() {
  return useContext(UserContext);
}

type Props = {
  children: ReactNode;
};

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<userContextType>(userContextDefaultValues);

  const setData = (email: string, id: string) => {
    const newUser: userContextType = {
      id: id,
      email: email,
      setData: user.setData,
    };
    setUser(newUser);
  };

  const val: userContextType = {
    id: user.id,
    email: user.email,
    setData: setData,
  };

  return (
    <>
      <UserContext.Provider value={val}>{children}</UserContext.Provider>
    </>
  );
}
