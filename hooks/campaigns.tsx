import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { prisma } from "@utils/prisma";

export async function getCampaigns(userId: string) {
  if (userId) {
    const campaigns = await prisma.campaign.findMany({
      where: {
        kinde_id: userId,
      },
    });

    if (!campaigns) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return campaigns;
  }
}

export async function getResourceForUserById(
  resourceType: string,
  user: User | KindeUser | null,
  id: string
) {
  let ressource;
  if (resourceType === "campaigns") {
    ressource = await prisma.campaign.findUnique({
      where: {
        id: id,
        userId: user?.id,
      },
    });
  }

  if (resourceType === "campaigns") {
    ressource = await prisma.campaign.findUnique({
      where: {
        id: id,
        userId: user?.id,
      },
    });
  }
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!ressource) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data for user: " + user?.given_name);
  }
}
