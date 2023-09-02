"use client";
import type { FC } from "react";
import { Database } from "@/types/database.types";
import Button from "@mui/material/Button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

type AuthButtonProps = {
  variant: "Login" | "Logout";
};

export const AuthButton: FC<AuthButtonProps> = ({ variant }) => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Button
      sx={{
        color: "primary.contrastText",
        ":hover": { scale: "110%", transition: "300ms ease-out 50ms all" },
      }}
      onClick={variant === "Logout" ? handleSignOut : () => {}}
    >
      {variant}
    </Button>
  );
};
