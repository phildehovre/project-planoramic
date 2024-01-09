"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@utils/prisma";
import { createEvent } from "./eventActions";
import { redirect } from "next/navigation";

export async function create(userId: string, phaseNumber: number) {
  const template = await prisma.template.create({
    data: {
      name: "Untitled",
      description: "",
      kinde_id: userId,
    },
  });

  if (template) {
    const event = await createEvent(template.id, userId, phaseNumber);
  }

  revalidatePath("/");
  redirect(`/dashboard/template/${template.id}`);
  return template;
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

export async function deleteTodo(formData: FormData) {
  const inputId = formData.get("inputId") as string;

  await prisma.template.delete({
    where: {
      id: inputId,
    },
  });

  revalidatePath("/");
}

export async function todoStatus(formData: FormData) {
  const inputId = formData.get("inputId") as string;
  const template = await prisma.template.findUnique({
    where: {
      id: inputId,
    },
  });

  if (!template) {
    return;
  }

  //   const updatedStatus = !template.isCompleted;

  await prisma.template.update({
    where: {
      id: inputId,
    },
    data: {
      //   isCompleted: updatedStatus,
    },
  });

  revalidatePath("/");

  //   return updatedStatus;
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
