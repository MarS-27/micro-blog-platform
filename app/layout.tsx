import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Providers } from "@/context/Providers";
import Box from "@mui/material/Box";
import type { Metadata } from "next";
import type { FC, ReactNode } from "react";
import "./globals.css";

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
        <Providers>
          <Header />
          <Box sx={{ flexGrow: 1 }} component="main">
            {children}
          </Box>
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
