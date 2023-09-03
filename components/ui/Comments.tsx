import { Database } from "@/types/database.types";
import type { PostWithProfile } from "@/types/types";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { FC } from "react";

type CommentsProps = {
  post: PostWithProfile;
};

export const Comments: FC<CommentsProps> = async ({ post }) => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  let { data: comments } = await supabase
    .from("comments")
    .select(`*, profile (*)`)
    .eq("post_id", post.id as number);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: { xs: "100%", sm: "80%" },
        margin: "10px auto",
        padding: "10px",
        border: "2px solid rgba(0, 0, 0, 0.4)",
        borderRadius: "6px",
        maxHeight: "200px",
        overflow: "auto",
      }}
    >
      {comments?.length ? (
        <>
          {comments?.map((comment) => (
            <Box
              key={comment.id}
              sx={{
                display: "flex",
                gap: "10px",
                flexDirection: { xs: "column", sm: "row" },
                paddingBottom: "10px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.4)",
                ":last-of-type": { borderBottom: "none", paddingBottom: "0" },
              }}
            >
              <Box
                key={comment.id}
                sx={{
                  display: "flex",
                  gap: "5px",
                  justifyContent: { xs: "space-between", sm: "flex-start" },
                  flexDirection: { xs: "row", sm: "column" },
                  minWidth: { xs: "100%", sm: "20%" },
                  paddingRight: { sm: "10px" },
                  borderRightColor: { sm: "secondary.dark" },
                  borderRightWidth: { sm: "1px" },
                  borderRightStyle: { sm: "solid" },
                }}
              >
                <Typography variant="body2">
                  {comment.created_at.slice(0, 10)}
                </Typography>
                <Typography variant="body2">
                  {comment.profile?.user_name}
                </Typography>
              </Box>
              <Typography variant="subtitle1">{comment.text}</Typography>
            </Box>
          ))}
        </>
      ) : (
        <Typography variant="subtitle1">No comments yet!</Typography>
      )}
    </Box>
  );
};
