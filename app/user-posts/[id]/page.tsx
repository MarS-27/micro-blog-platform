import type { FC } from "react";
import { PostItem } from "@/components/ui/PostItem";
import type { Database } from "@/types/database.types";
import Box from "@mui/material/Box";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Typography from "@mui/material/Typography";
import { AddCommentForm } from "@/components/ui/AddCommentForm";
import { Comments } from "@/components/ui/Comments";
import ReplyIcon from "@mui/icons-material/Reply";
import Fab from "@mui/material/Fab";
import Link from "next/link";

type UserPostsProps = {
  params: { id: string };
};

export const dynamic = "force-dynamic";

async function getUserPostsData(userId: string) {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const { data: session } = await supabase.auth.getSession();

  const { data: posts } = await supabase
    .from("posts")
    .select(`*, profile (*)`)
    .eq("profile_id", userId);

  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("profile_user_id", session.session?.user.id as string);

  return { session, posts, profile };
}

const UserPosts: FC<UserPostsProps> = async ({ params: { id } }) => {
  const { session, posts, profile } = await getUserPostsData(id);

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
        gap: "10px",
      }}
    >
      <Box
        sx={{
          paddingBottom: "10px",
          borderBottom: "2px solid rgba(0, 0, 0, 0.6)",
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <Link href="/">
          <Fab size="small">
            <ReplyIcon />
          </Fab>
        </Link>

        <Typography variant="h4">
          {posts?.length
            ? `Posts by ${posts[0].profile?.user_name}`
            : "Posts not found!"}
        </Typography>
      </Box>
      <>
        {posts?.map((post) => (
          <Box key={post.id}>
            <PostItem post={post} authorLabel={false} />
            {session &&
            profile?.length &&
            profile[0].user_role === "Commentator" ? (
              <AddCommentForm post_id={post.id} profile_id={profile[0].id} />
            ) : null}
            <Comments post={post} />
          </Box>
        ))}
      </>
    </Box>
  );
};

export default UserPosts;
