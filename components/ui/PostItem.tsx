import type { FC } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { PostWithProfile } from "@/types/types";
import { AuthorLabel } from "./AuthorLabel";

type PostItemProps = {
  post: PostWithProfile;
  authorLabel: boolean;
};

export const PostItem: FC<PostItemProps> = ({ post, authorLabel }) => {
  return (
    <Paper
      sx={{
        padding: "15px",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1">
          {post.created_at?.slice(0, 10)}
        </Typography>
        {authorLabel ? (
          <AuthorLabel
            profileId={post.profile_id}
            userName={post.profile?.user_name as string}
          />
        ) : null}
      </Box>
      <Typography variant="h6">{post.title}</Typography>
      <Typography variant="body1" color="text.secondary">
        {post.text}
      </Typography>
    </Paper>
  );
};
