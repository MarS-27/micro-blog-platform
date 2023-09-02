import type { FC } from "react";
import { Post } from "@/components/ui/Post";
import type { Database } from "@/types/database.types";
import Box from "@mui/material/Box";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Home: FC = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const { data } = await supabase.auth.getSession();
  console.log(data);

  let { data: posts, error } = await supabase.from("posts").select(`
    *,
    profile (
      *
    )
  `);

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
      {posts?.map((post) => (
        <Post key={post.id} post={post} authorLabel={true} />
      ))}
    </Box>
  );
};

export default Home;
