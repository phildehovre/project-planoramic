import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import React from "react";
import Styles from "./Header.module.scss";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUser } from "@hooks/db";

const Header = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  const userData = await getUser();

  if (isLoggedIn) {
    const { data, error } = await createUser(userData);
  }

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
    <header className={Styles.nav_ctn}>
      <nav className={`${Styles.nav} w-full flex justify-evenly`}>
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
        <Link className={Styles.nav_link} href="/Contact">
          Contact
        </Link>

        {isLoggedIn ? (
          <>
            <Link className={Styles.nav_link} href="/dashboard">
              Dashboard
            </Link>
            <Image
              src={userData?.picture || ""}
              alt="User profile picture"
              width={30}
              height={30}
            />
            <LogoutLink className="button">Log out</LogoutLink>
          </>
        ) : (
          <>
            <LoginLink className="button black">Sign in</LoginLink>
            <RegisterLink className="button">Sign up</RegisterLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
