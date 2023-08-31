export type UserLoginInfo = {
  email: string;
  password: string;
  user_name?: string;
  user_role?: string;
};

export type LoginStatus = "signin" | "signup" | "signup success";
