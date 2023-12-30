import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import { getTemplates, getCampaigns } from "@prisma/db";
import Sidebar from "@components/Sidebar";
import Spinner from "@components/Spinner";

const Dashboard = async () => {
  // const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  const { isAuthenticated } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();
  const templates = await getTemplates();
  const campaigns = await getCampaigns();

  const ressourceData = [
    {
      heading: "templates",
      items: templates,
    },
    {
      heading: "campaigns",
      items: campaigns,
    },
    {
      heading: "settings",
      items: ["Settings", "Profile", "Logout"],
    },
  ];

  return (
    <div>
      {isLoggedIn && (
        <div className="dashboard_ctn">
          <Sidebar data={ressourceData} />
          <div className="dashboard">
            <section></section>
          </div>
        </div>
      )}
      <Spinner loading={!isAuthenticated} />
    </div>
  );
};

export default Dashboard;
