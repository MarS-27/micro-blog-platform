import type { FC } from "react";
import { Post } from "@/components/ui/Post";
import type { Database } from "@/types/database.types";
import Box from "@mui/material/Box";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Typography from "@mui/material/Typography";

type UserPostsProps = {
  params: { id: string };
};

const UserPosts: FC<UserPostsProps> = async ({ params: { id } }) => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const { data } = await supabase.auth.getSession();

  let { data: posts, error } = await supabase
    .from("posts")
    .select(
      `
        *,
        profile (
          *
        )
      `
    )
    .eq("profile_id", id);

  return (
    <Box
      component="section"
      sx={{
        maxWidth: "lg",
        width: "100%",
        margin: "40px auto 0 auto",
        px: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          paddingBottom: "10px",
          borderBottom: "2px solid rgba(0, 0, 0, 0.6)",
        }}
      >
        Posts by {posts[0].profile?.user_name}
      </Typography>
      {posts?.map((post) => (
        <Post key={post.id} post={post} authorLabel={false} />
      ))}
    </Box>
  );
};

export default UserPosts;
