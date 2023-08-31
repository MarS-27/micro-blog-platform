export type UserLoginInfo = {
  email: string;
  password: string;
  name?: string;
  role?: string;
};

export type LoginStatus = "signin" | "signup" | "signup success";
