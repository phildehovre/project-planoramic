import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();
  const user = await getUser();

  console.log(isLoggedIn);

  return (
    <header>
      <nav>
        <Image
          src=""
          alt="Logo"
          width={30}
          height={30}
          className="logo w-full flex justify-evenly"
        />
        <Link href="/">Home</Link>
        <Link href="/">About</Link>
        <Link href="/">Contacts</Link>

        {isLoggedIn ? (
          <>
            <Link href="/profile">Profile</Link>
            <LogoutLink>Logout</LogoutLink>{" "}
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
