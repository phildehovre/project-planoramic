"use-client";

import React from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import "./globals.scss";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <div className="flex">
          <ClerkProvider>
            <Theme>
              <main className={inter.className}>
                <Header />
                {children}
                <Footer />
              </main>
            </Theme>
          </ClerkProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
