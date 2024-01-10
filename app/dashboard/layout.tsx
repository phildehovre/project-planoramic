import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import { getTemplates } from "@hooks/templates";
import { getCampaigns } from "@hooks/campaigns";
import Sidebar from "@components/Sidebar";
import Spinner from "@components/Spinner";
import { redirect } from "next/navigation";

const Dashboard = async ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  const isLoggedIn = await isAuthenticated();
  let templates;
  let campaigns;

  if (user !== null) {
    templates = await getTemplates(user.id);
    campaigns = await getCampaigns(user.id);
  }

  if (!templates) {
    redirect("/dashboard");
  }

  const ressourceData: SidebarTypes[] = [
    {
      heading: "Templates",
      type: "template",
      items: templates,
    },
    {
      heading: "Campaigns",
      type: "campaign",
      items: campaigns,
    },
    {
      heading: "Settings",
      type: "settings",
      items: [
        { name: "Settings", description: "User and account settings" },
        { name: "Profile", description: "Your profile and account settings" },
        { name: "Logout", description: "Logout of your account" },
      ],
    },
  ];

  return (
    <div>
      {isLoggedIn && (
        <div className="dashboard_ctn">
          <Sidebar data={ressourceData} />
          <div className="dashboard">
            <section>{children}</section>
          </div>
        </div>
      )}
      <Spinner loading={!isAuthenticated} />
    </div>
  );
};

export default Dashboard;
