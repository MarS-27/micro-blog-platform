import "./globals.css";
import Header from "@/components/layout/Header";
import type { Metadata } from "next";
import type { FC, ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import { theme } from "@/utils/theme";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

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
