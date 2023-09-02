"use client";
import type { Database } from "@/types/database.types";
import type { PostComments } from "@/types/types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { type FC } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

type AddPostFormProps = {
  profile_id: string;
  post_id: number;
};

export const AddCommentForm: FC<AddPostFormProps> = ({
  profile_id,
  post_id,
}) => {
  //   const [isShowForm, setShowForm] = useState(false);
  const { control, handleSubmit, reset } = useForm<PostComments>();

  const supabase = createClientComponentClient<Database>();

  const addPostSubmit: SubmitHandler<PostComments> = async (data) => {
    const { text } = data;
    const { error } = await supabase
      .from("comments")
      .insert([{ text, profile_id, post_id }]);

    // reset({ text: "" });
    // setShowForm(false);
    console.log(error);
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
        margin: "20px auto",
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
        {/* <Typography variant="h5">Add post</Typography> */}
        {/* <Fab
          color="secondary"
          size="small"
          onClick={() => setShowForm(!isShowForm)}
        >
          {isShowForm ? <CloseIcon /> : <AddIcon />}
        </Fab> */}
      </Box>

      {/* {isShowForm ? ( */}
      <>
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
            width: { xs: "50%", sm: "30%" },
            margin: "0 auto",
          }}
          type="submit"
          variant="contained"
        >
          Save
        </Button>
      </>
      {/* ) : null} */}
    </Box>
  );
};
