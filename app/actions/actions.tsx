"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@utils/prisma";

export const updateField = async (
  type: string,
  id: any,
  key: any,
  val: any
) => {
  try {
    let updatedResource;
    const queryParams = {
      where: {
        id: id,
      },
      data: {
        [key]: val,
      },
    };
    switch (type) {
      case "template":
        updatedResource = await prisma.template.update(queryParams);
        break;
      case "event":
        updatedResource = await prisma.event.update(queryParams);
        break;
      case "campaign":
        updatedResource = await prisma.campaign.update(queryParams);
        break;
      default:
        break;
    }

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

export const handleDuplicatePhase = async (phase: number | undefined) => {
  console.log(phase);
};

export const handleDeletePhase = async (phase: number | undefined) => {
  console.log(phase);
};

export const handlePublishPhase = async (phase: number | undefined) => {
  console.log(phase);
};

export const handleDeleteResource = async (id: string) => {
  try {
    await prisma.event
      .deleteMany({
        where: {
          templateId: id,
        },
      })
      .then(async () => {
        await prisma.template.delete({
          where: {
            id: id,
          },
        });
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
