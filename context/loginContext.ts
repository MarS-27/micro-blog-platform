"use client";
import type { LoginStatus, UserLoginInfo } from "@/types/types";
import { type Dispatch, type SetStateAction, createContext } from "react";
import type {
  Control,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

export type LoginCtx = {
  loginStatus: LoginStatus;
  setLoginStatus: Dispatch<SetStateAction<LoginStatus>>;
  loginError: string;
  control: Control<UserLoginInfo>;
  handleSubmit: UseFormHandleSubmit<UserLoginInfo>;
  loginFormSubmit: SubmitHandler<UserLoginInfo>;
  cleanLoginForm: () => void;
};

export const LoginContext = createContext<LoginCtx | null>(null);
