"use client";

import Link from "next/link";
import React from "react";
import Styles from "./Header.module.scss";
import Image from "next/image";
import { createUser } from "@hooks/db";
import { SignInButton, UserButton, currentUser, useUser } from "@clerk/nextjs";

const Header = () => {
  const isLoggedin = false;
  const { user, isSignedIn } = useUser();

  // if (isSignedIn) {
  //   const { data, error } = await createUser(user);
  // }

  const dropDownOptions = [
    {
      label: "Dashboard",
      link: "/dashboard",
      requiresAuth: true,
    },
    {
      label: "Logout",
      link: "/logout",
      requiresAuth: true,
    },
  ];

  return (
    <header className={`${Styles.nav_ctn} w-full `}>
      <nav
        className={`${Styles.nav} sm:hidden md:w-1/2 lg:w-2/3 flex justify-evenly`}
      >
        <Image
          src="/seanjacksonband-logo.svg"
          alt="logo"
          width={30}
          height={30}
        />
        <Link className={Styles.nav_link} href="/">
          Home
        </Link>
        <Link className={Styles.nav_link} href="about">
          About
        </Link>
        <Link className={Styles.nav_link} href="/contact">
          Contact
        </Link>
        {isSignedIn ? (
          <>
            <Link className={Styles.nav_link} href="/dashboard">
              Dashboard
            </Link>
            <UserButton />
          </>
        ) : (
          <SignInButton />
        )}
      </nav>
    </header>
  );
};

export default Header;
