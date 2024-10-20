"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { IProvider } from "@web3auth/base";
import { web3auth } from "@/lib/web3auth";

interface Web3AuthContextProps {
  provider: IProvider | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loggedIn: boolean;
}

const Web3AuthContext = createContext<Web3AuthContextProps | undefined>(undefined);

export const Web3AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    setLoggedIn(true);
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };

  return (
    <Web3AuthContext.Provider value={{ provider, login, logout, loggedIn }}>
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => {
  const context = useContext(Web3AuthContext);
  if (!context) {
    throw new Error("useWeb3Auth debe ser utilizado dentro de un Web3AuthProvider");
  }
  return context;
};
