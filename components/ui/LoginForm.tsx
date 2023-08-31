import { useLoginContext } from "@/context/LoginContextProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import type { FC } from "react";
import { LoginFormInput } from "./LoginFormInput";

export const LoginForm: FC = () => {
  const { handleSubmit, loginFormSubmit, loginStatus, cleanLoginForm } =
    useLoginContext();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(loginFormSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: { xs: "100%", sm: "50%" },
        margin: "20px auto",
      }}
    >
      <LoginFormInput variant="email" />
      <LoginFormInput variant="password" />

      {loginStatus === "signup" ? (
        <>
          <LoginFormInput variant="user_name" />
          <LoginFormInput variant="user_role" />
        </>
      ) : null}

      <ButtonGroup
        sx={{
          display: "flex",
          gap: "10px",
          width: "100%",
        }}
      >
        <Button
          sx={{
            width: "100%",
          }}
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          sx={{
            width: "100%",
          }}
          startIcon={<DeleteIcon />}
          onClick={cleanLoginForm}
        >
          Clean
        </Button>
      </ButtonGroup>
    </Box>
  );
};
