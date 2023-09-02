import type { FC } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type AuthorLabelProps = {
  userName: string;
  profileId: string;
};

export const AuthorLabel: FC<AuthorLabelProps> = ({ userName, profileId }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: "4px", sm: "20px" },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="body2">Author: {userName}</Typography>
      <Link href={`user-posts/${profileId}`}>
        <Button variant="outlined" sx={{ padding: "4px", fontSize: "12px" }}>
          More {userName} posts
        </Button>
      </Link>
    </Box>
  );
};
