import { auth, currentUser } from "@clerk/nextjs";
import React from "react";

const Page = async () => {
  // const authUser = await currentUser();
  const { user } = auth();

  return <div>Page</div>;
};

export default Page;
