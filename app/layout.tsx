"use-client";

import React from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import "./globals.scss";
import Sidebar from "@components/Sidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <div className="flex">
          <main>
            <Header />
            {children}
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
