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

export async function getUniqueCampaignByUser(id: any, user: any) {
  if (user) {
    let resource = await prisma.campaign.findUnique({
      where: {
        id: id,
        kinde_id: user.id,
      },
    });
    return resource;
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
        kinde_id: user?.id,
      },
    });
  }

  if (resourceType === "campaigns") {
    ressource = await prisma.campaign.findUnique({
      where: {
        id: id,
        kinde_id: user?.id,
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

export const getEventsByCampaignId = async (
  id: string,
  user: KindeUser | null
) => {
  if (!id || !user) return;
  let isLoading = true;
  let events;
  let error;

  try {
    events = prisma.event.findMany({
      where: {
        campaignId: id,
        kinde_id: user.id,
      },
      orderBy: {
        date: "asc", // or 'desc' for descending order
      },
    });

    return events;
  } catch (err: any) {
    error = err;
  }

  return { isLoading, events, error };
};

export const getCampaignEvents = async (id: string) => {
  if (!id) return;
  let isLoading = true;
  let events;
  let error;

  try {
    events = prisma.event.findMany({
      where: {
        campaignId: id,
      },
    });

    return events;
  } catch (err: any) {
    error = err;
  }

  return { isLoading, events, error };
};
