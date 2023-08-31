import type { UserLoginInfo, LoginStatus } from "@/types/types";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import type { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormInput } from "./LoginFormInput";
import supabase from "@/supebase";

type LoginFormProps = {
  loginStatus: LoginStatus;
};

export const LoginForm: FC<LoginFormProps> = ({ loginStatus }) => {
  const { control, handleSubmit, reset } = useForm<UserLoginInfo>();

  const onFormSubmit: SubmitHandler<UserLoginInfo> = async (credentials) => {
    if (loginStatus === "signup") {
      try {
        let { data, error } = await supabase.auth.signUp(credentials);
        console.log(data, error);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        let { data, error } = await supabase.auth.signInWithPassword(
          credentials
        );
        console.log(data, error);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const cleanForm = () => {
    reset({ email: "", password: "", name: "", role: "" });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onFormSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: { xs: "100%", sm: "50%" },
        margin: "20px auto",
      }}
    >
      <LoginFormInput control={control} variant="email" />
      <LoginFormInput control={control} variant="password" />

      {loginStatus === "signup" ? (
        <>
          <LoginFormInput control={control} variant="name" />
          <LoginFormInput control={control} variant="role" />
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
          onClick={cleanForm}
        >
          Clean
        </Button>
      </ButtonGroup>
    </Box>
  );
};
