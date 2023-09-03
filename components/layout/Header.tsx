import type { FC } from "react";
import type { Database } from "@/types/database.types";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { AuthButton } from "./AuthButton";

export const dynamic = "force-dynamic";

async function getSession() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}

const Header: FC = async () => {
  const session = await getSession();

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          justifyContent: "space-between",
          maxWidth: "lg",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Link
          href="/"
          style={{ display: "flex", gap: "10px", alignItems: "center" }}
        >
          <NewspaperIcon
            sx={{
              color: "primary.contrastText",
            }}
          />
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "24px",
              color: "primary.contrastText",
            }}
          >
            Just a blog
          </Typography>
        </Link>

        {session ? (
          <AuthButton variant="Logout" />
        ) : (
          <Link href="/login">
            <AuthButton variant="Login" />
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
