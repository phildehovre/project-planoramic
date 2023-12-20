// "use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";
import { PrismaClient } from "@prisma/client";

const Dashboard = () => {
  // const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  const prisma = new PrismaClient();

  return <div>Dashboard</div>;
};

export default Dashboard;
