"use client"

import { createContext, useContext, useState, ReactNode } from "react";
import { IProvider } from "@web3auth/base";
import { web3auth } from "../lib/web3auth";

interface AuthContextProps {
  provider: IProvider | null;
  loggedIn: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ provider, loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
