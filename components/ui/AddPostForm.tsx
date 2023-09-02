"use client";
import type { Database } from "@/types/database.types";
import type { Post } from "@/types/types";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState, type FC } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

type AddPostFormProps = {
  profile_id: string;
};

export const AddPostForm: FC<AddPostFormProps> = ({ profile_id }) => {
  const router = useRouter();
  const [isShowForm, setShowForm] = useState(false);
  const { control, handleSubmit, reset } = useForm<Post>();

  const supabase = createClientComponentClient<Database>();

  const addPostSubmit: SubmitHandler<Post> = async (data) => {
    const { text, title } = data;
    const { error } = await supabase
      .from("posts")
      .insert([{ text, title, profile_id }]);

    reset({ title: "", text: "" });
    setShowForm(false);
    router.refresh();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(addPostSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: { xs: "100%", sm: "70%" },
        margin: "10px auto",
      }}
    >
      <Box
        sx={{
          paddingBottom: "10px",
          borderBottom: "2px solid rgba(0, 0, 0, 0.6)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Typography variant="h5">Add post</Typography>
        <Fab
          color="secondary"
          size="small"
          onClick={() => setShowForm(!isShowForm)}
        >
          {isShowForm ? <CloseIcon /> : <AddIcon />}
        </Fab>
      </Box>

      {isShowForm ? (
        <>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({
              field: { ref, value, onChange },
              formState: { errors },
            }) => (
              <FormControl>
                <TextField
                  inputRef={ref}
                  value={value}
                  onChange={onChange}
                  label={
                    errors.title?.type === "required"
                      ? `Title is required`
                      : "Title"
                  }
                  variant="outlined"
                  type="text"
                  sx={{
                    backgroundColor: "background.paper",
                    borderRadius: "6px",
                  }}
                  error={!!errors.title}
                />
              </FormControl>
            )}
          />
          <Controller
            name="text"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({
              field: { ref, value, onChange },
              formState: { errors },
            }) => (
              <FormControl>
                <TextField
                  inputRef={ref}
                  value={value}
                  onChange={onChange}
                  label={
                    errors.text?.type === "required"
                      ? `Text is required`
                      : "Text"
                  }
                  variant="outlined"
                  type="text"
                  multiline
                  rows={4}
                  sx={{
                    backgroundColor: "background.paper",
                    borderRadius: "6px",
                  }}
                  error={!!errors.text}
                />
              </FormControl>
            )}
          />
          <Button
            sx={{
              width: "150px",
              margin: "0 auto",
            }}
            type="submit"
            variant="contained"
          >
            Save
          </Button>
        </>
      ) : null}
    </Box>
  );
};
