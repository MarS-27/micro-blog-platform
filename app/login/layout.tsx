"use client";
import { LoginContextProvider } from "@/context/LoginContextProvider";
import type { FC, ReactNode } from "react";

type LoginLayoutProps = {
  children: ReactNode;
};

const LoginLayout: FC<LoginLayoutProps> = ({ children }) => {
  return <LoginContextProvider>{children}</LoginContextProvider>;
};

export default LoginLayout;
