"use client";
import type { Database } from "@/types/database.types";
import type { PostComments } from "@/types/types";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, type FC } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type AddPostFormProps = {
  profile_id: string;
  post_id: number;
};

export const AddCommentForm: FC<AddPostFormProps> = ({
  profile_id,
  post_id,
}) => {
  const router = useRouter();
  const [isShowForm, setShowForm] = useState(false);
  const { control, handleSubmit, reset } = useForm<PostComments>();

  const supabase = createClientComponentClient<Database>();

  const addPostSubmit: SubmitHandler<PostComments> = async (data) => {
    const { text } = data;
    const { error } = await supabase
      .from("comments")
      .insert([{ text, profile_id, post_id }]);

    reset({ text: "" });
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
        gap: "10px",
        width: { xs: "100%", sm: "80%" },
        margin: "20px auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Fab
          color="secondary"
          size="small"
          onClick={() => setShowForm(!isShowForm)}
        >
          {isShowForm ? <CloseIcon /> : <AddIcon />}
        </Fab>
        {isShowForm ? (
          <Button
            sx={{
              width: "150px",
              padding: "4px",
            }}
            type="submit"
            variant="contained"
          >
            Save
          </Button>
        ) : (
          <Typography variant="body1">Add comment</Typography>
        )}
      </Box>

      {isShowForm ? (
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
                  errors.text?.type === "required" ? `Text is required` : "Text"
                }
                variant="outlined"
                type="text"
                multiline
                rows={2}
                sx={{
                  backgroundColor: "background.paper",
                  borderRadius: "6px",
                }}
                error={!!errors.text}
              />
            </FormControl>
          )}
        />
      ) : null}
    </Box>
  );
};
