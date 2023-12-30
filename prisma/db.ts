import { PrismaClient } from "@prisma/client";

export async function getTemplates() {
    const prisma = new PrismaClient();
    const templates = await prisma.template.findMany();
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!templates) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
  
    return templates;
  }
export async function getCampaigns() {
    const prisma = new PrismaClient();
    const campaigns = await prisma.campaign.findMany();
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
  
    if (!campaigns) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
  
    return campaigns;
  }