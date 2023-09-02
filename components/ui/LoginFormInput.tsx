import { useLoginContext } from "@/context/LoginContextProvider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import type { FC } from "react";
import { Controller } from "react-hook-form";

type LoginFormInputProps = {
  variant: "user_name" | "email" | "password" | "user_role";
};

export const LoginFormInput: FC<LoginFormInputProps> = ({ variant }) => {
  const { control } = useLoginContext();

  const variantCapitalize = variant
    .replace("_", " ")
    .replace(variant.charAt(0), variant.charAt(0).toUpperCase());

  const passwordValidationPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  return (
    <Controller
      name={variant}
      control={control}
      defaultValue=""
      rules={
        variant === "password"
          ? { required: true, pattern: passwordValidationPattern }
          : { required: true }
      }
      render={({ field: { ref, value, onChange }, formState: { errors } }) => (
        <FormControl>
          {variant === "user_role" ? (
            <>
              <InputLabel id="select-label" error={!!errors[variant]}>
                {errors[variant]?.type === "required"
                  ? `${variantCapitalize} is required`
                  : `${variantCapitalize}`}
              </InputLabel>
              <Select
                labelId="select-label"
                inputRef={ref}
                value={value}
                label={
                  errors[variant]?.type === "required"
                    ? `${variantCapitalize} is required`
                    : `${variantCapitalize}`
                }
                onChange={onChange}
                sx={{
                  backgroundColor: "background.paper",
                  borderRadius: "6px",
                }}
                error={!!errors[variant]}
              >
                <MenuItem value="Author">Author</MenuItem>
                <MenuItem value="Commentator">Commentator</MenuItem>
              </Select>
            </>
          ) : (
            <TextField
              inputRef={ref}
              value={value?.trim()}
              onChange={onChange}
              label={
                errors[variant]?.type === "required"
                  ? `${variantCapitalize} is required`
                  : errors[variant]?.type === "pattern"
                  ? `Minimum 8 chars, minimum 1 letter or number`
                  : `${variantCapitalize}`
              }
              variant="outlined"
              type={variant === "user_name" ? "text" : variant}
              sx={{
                backgroundColor: "background.paper",
                borderRadius: "6px",
              }}
              error={!!errors[variant]}
            />
          )}
        </FormControl>
      )}
    />
  );
};
