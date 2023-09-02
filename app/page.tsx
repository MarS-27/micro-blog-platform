import type { FC } from "react";
import { Post } from "@/components/ui/Post";
import type { Database } from "@/types/database.types";
import Box from "@mui/material/Box";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { AddPostForm } from "@/components/ui/AddPostForm";

const Home: FC = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const { data: session } = await supabase.auth.getSession();

  let { data: posts, error: postsError } = await supabase.from("posts").select(`
    *,
    profile (
      *
    )
  `);

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
      {session && profile?.length && profile[0].user_role === "Author" ? (
        <AddPostForm profile_id={profile[0].id} />
      ) : null}
      {posts?.map((post) => (
        <Post key={post.id} post={post} authorLabel={true} />
      ))}
    </Box>
  );
};

export default Home;
