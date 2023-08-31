import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { type FC } from "react";

const Header: FC = () => {
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          justifyContent: "space-between",
          maxWidth: "lg",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
        <Link href="/">
          <Typography
            sx={{
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: "24px",
              color: "primary.contrastText",
            }}
          >
            Just a blog
          </Typography>
        </Link>
        <Link href="/login">
          <Button
            sx={{
              color: "primary.contrastText",
            }}
          >
            Login
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
