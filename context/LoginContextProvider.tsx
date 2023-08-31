"use client";
import { useState, type FC, type ReactNode, useContext } from "react";
import type { UserLoginInfo, LoginStatus } from "@/types/types";
import supabase from "@/supebase";
import { type SubmitHandler, useForm } from "react-hook-form";
import { LoginContext } from "./loginContext";

type LoginContextProviderProps = {
  children: ReactNode;
};

export const LoginContextProvider: FC<LoginContextProviderProps> = ({
  children,
}) => {
  const [loginStatus, setLoginStatus] = useState<LoginStatus>("signin");
  const [loginError, setLoginError] = useState<string>("");
  const { control, handleSubmit, reset } = useForm<UserLoginInfo>();

  const loginFormSubmit: SubmitHandler<UserLoginInfo> = async (credentials) => {
    const { email, password, user_name, user_role } = credentials;

    if (loginStatus === "signup") {
      try {
        setLoginError("");
        let { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              user_name,
              user_role,
            },
          },
        });

        if (error) {
          setLoginError(error.message);
        } else {
          setLoginStatus("signup success");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        setLoginError("");
        let { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setLoginError(error.message);
        } else {
          setLoginStatus("signin");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const cleanLoginForm = () => {
    reset({ email: "", password: "", user_name: "", user_role: "" });
  };

  const contextValue = {
    loginStatus,
    setLoginStatus,
    loginError,
    control,
    handleSubmit,
    loginFormSubmit,
    cleanLoginForm,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const ctx = useContext(LoginContext);
  if (!ctx) {
    throw new Error("Login context is not provided");
  }
  return ctx;
};
