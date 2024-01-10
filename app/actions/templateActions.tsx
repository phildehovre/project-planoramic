"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@utils/prisma";
import { createEvent } from "./eventActions";
import { redirect } from "next/navigation";

export async function createTemplate(
  name: string,
  userId: string,
  phaseNumber: number
) {
  const template = await prisma.template.create({
    data: {
      name: name || "Untitled",
      description: "",
      kinde_id: userId,
    },
  });

  if (template) {
    const event = await createEvent(template.id, userId, phaseNumber);
  }

  revalidatePath("/");
  redirect(`/dashboard/template/${template.id}`);
}

export async function edit(formData: FormData) {
  const input = formData.get("newTitle") as string;
  const inputId = formData.get("inputId") as string;

  await prisma.template.update({
    where: {
      id: inputId,
    },
    data: {
      //   title: input,
    },
  });

  revalidatePath("/");
}
export async function update(formData: FormData, id: string) {
  for (let key in formData) {
    const input = formData.get(key) as string;

    await prisma.template.update({
      where: {
        id: id,
      },
      data: {
        [key]: input,
      },
    });
  }

  revalidatePath("/");
}

export const updateField = async (id: any, key: any, val: any) => {
  try {
    const updatedResource = await prisma.template.update({
      where: {
        id: id,
      },
      data: {
        [key]: val,
      },
    });

    revalidatePath("/");
    // Handle success, if needed
    // console.log("Update successful:", updatedResource);
  } catch (error: any) {
    // Handle errors here
    console.error("Error updating field:", error.message);
    // Optionally, rethrow the error if you want to propagate it further
    throw error;
  }
};
export const test = async (string: string) => {
  console.log(string);
};

export const publish = async (
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
