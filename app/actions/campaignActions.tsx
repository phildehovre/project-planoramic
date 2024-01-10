"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@utils/prisma";
import { createEvent } from "./eventActions";
import { redirect } from "next/navigation";

export const handlePublishCampaign = async (id: string) => {
  console.log(id);
};

export const createCampaign = async (
  userId: string,
  name: string,
  targetDate: any
) => {
  const ISOTargetDate = new Date(targetDate).toISOString();
  const campaign = await prisma.campaign.create({
    data: {
      name: name || "Untitled",
      description: "",
      kinde_id: userId,
      target_date: ISOTargetDate,
    },
  });

  if (campaign) {
    const event = await createEvent(campaign.id, userId);
  }
  if (campaign) {
    const events = [];
  }

  revalidatePath("/");
  redirect(`/dashboard/template/${campaign.id}`);
};
