import React from "react";
import { getTemplates } from "@hooks/templates";
import { getCampaigns } from "@hooks/campaigns";
import Sidebar from "@components/Sidebar";
import Spinner from "@components/Spinner";
import { redirect } from "next/navigation";
import * as gapi from "googleapis";
import { auth, clerkClient, currentUser } from "@clerk/nextjs";

const Dashboard = async ({ children }: { children: React.ReactNode }) => {
  const authObject = auth();
  const user = await currentUser();

  const [OauthAccessToken] = await clerkClient.users.getUserOauthAccessToken(
    user.id || "",
    "oauth_google"
  );

  console.log(OauthAccessToken);

  let templates;
  let campaigns;

  if (!!user) {
    templates = await getTemplates(user.id);
    campaigns = await getCampaigns(user.id);
  }

  // if (!templates) {
  //   redirect("/dashboard");
  // }

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
      {user && (
        <div className="dashboard_ctn">
          <Sidebar data={ressourceData} />
          <div className="dashboard">
            <section>{children}</section>
          </div>
        </div>
      )}
      {/* <Spinner loading={isLoading} /> */}
    </div>
  );
};

export default Dashboard;
