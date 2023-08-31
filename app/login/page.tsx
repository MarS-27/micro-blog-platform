"use client";
import { LoginForm } from "@/components/ui/LoginForm";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState, type FC } from "react";
import Typography from "@mui/material/Typography";
import type { LoginStatus } from "@/types/types";

const Login: FC = () => {
  const [loginStatus, setLoginStatus] = useState<LoginStatus>("signin");

  return (
    <Box
      component="section"
      sx={{
        maxWidth: "lg",
        width: "100%",
        margin: "40px auto 0 auto",
        px: "24px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          {loginStatus === "signup" ? "Sign Up" : "Sign In"}
        </Typography>
        {loginStatus === "signup success" ? (
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Registration is successful, log in to the account.
          </Typography>
        ) : null}
      </Box>
      <LoginForm loginStatus={loginStatus} />
      <Button
        sx={{ margin: "0 auto", display: "block" }}
        onClick={
          loginStatus === "signup"
            ? () => setLoginStatus("signin")
            : () => setLoginStatus("signup")
        }
      >
        {loginStatus === "signup"
          ? "Already have an account?"
          : "You don't have an account?"}
      </Button>
    </Box>
  );
};

export default Login;
