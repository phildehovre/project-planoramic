import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { prisma } from "@utils/prisma";

export async function getTemplates(userId: string) {
  if (userId) {
    const templates = await prisma.template.findMany({
      where: {
        kinde_id: userId,
      },
    });

    if (!templates) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return templates;
  }
}

// export async function testGetTemplate() {
//   let ressource = await prisma.template.findMany({
//     where: {
//       kinde_id: "kp_a9cf3f6366f141cc8537b36a7aec9d03",
//     },
//   });

//   return ressource;
// }
export async function getUniqueTemplateByUser(id: any, user: any) {
  if (user) {
    let resource = await prisma.template.findUnique({
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
  user: User | KindeUser,
  id: string
) {
  if (user) {
    let ressource;
    if (resourceType === "templates") {
      ressource = await prisma.template.findUnique({
        where: {
          id: id,
          kinde_id: user.id,
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
}
