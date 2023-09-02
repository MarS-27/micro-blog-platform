import type { FC } from "react";
import { Post } from "@/components/ui/Post";
import type { Database } from "@/types/database.types";
import Box from "@mui/material/Box";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Typography from "@mui/material/Typography";
import { AddCommentForm } from "@/components/ui/AddCommentForm";

type UserPostsProps = {
  params: { id: string };
};

const UserPosts: FC<UserPostsProps> = async ({ params: { id } }) => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const { data: session } = await supabase.auth.getSession();

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

  let { data: profile, error: profileError } = await supabase
    .from("profile")
    .select("*")
    .eq("profile_user_id", session.session?.user.id as string);

  return (
    <Box
      component="section"
      sx={{
        maxWidth: "lg",
        width: "100%",
        margin: "80px auto 40px auto",
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
        {posts?.length
          ? `Posts by ${posts[0].profile?.user_name}`
          : "Posts not found!"}
      </Typography>
      {posts?.map((post) => (
        <Box key={post.id}>
          <Post post={post} authorLabel={false} />
          {session &&
          profile?.length &&
          profile[0].user_role === "Commentator" ? (
            <AddCommentForm post_id={post.id} profile_id={profile[0].id} />
          ) : null}
        </Box>
      ))}
    </Box>
  );
};

export default UserPosts;
