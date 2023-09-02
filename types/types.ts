export type UserLoginInfo = {
  email: string;
  password: string;
  user_name?: string;
  user_role?: string;
};

export type LoginStatus = "signin" | "signup" | "signup success";

export type Post = {
  created_at?: string;
  id?: number;
  profile_id: string;
  text: string;
  title: string;
};

export type UserProfile = {
  created_at?: string;
  id?: string;
  profile_user_id: string;
  user_name: string;
  user_role: string;
};

export type PostComments = {
  created_at?: string;
  id?: number;
  post_id: number;
  profile_id: string;
  text: string;
};

export type PostWithProfile = Post & { profile: UserProfile | null };
