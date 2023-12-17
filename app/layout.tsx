import React from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <body>
        <main>{children}</main>
      </body>
      <Footer />
    </>
  );
};

export default RootLayout;
