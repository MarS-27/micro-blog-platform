import Header from "@/components/layout/Header";
import "./globals.css";
import type { Metadata } from "next";
import type { FC, ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@mui/system";
import { Box, CssBaseline } from "@mui/material";
import { theme } from "@/utils/theme";

export const metadata: Metadata = {
  title: "Micro-blog",
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Box sx={{ flexGrow: 1 }} component="main">
            {children}
          </Box>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
