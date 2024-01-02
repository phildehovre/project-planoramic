"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@utils/prisma";

export async function createEvent(templateId: string, userId: string) {
  const event = await prisma.event.create({
    data: {
      name: "",
      description: "",
      kinde_id: userId,
      templateId,
      type: "template",
    },
  });

  revalidatePath("/");
  return event;
}

export async function edit(formData: FormData) {
  const input = formData.get("newTitle") as string;
  const inputId = formData.get("inputId") as string;

  await prisma.event.update({
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

    await prisma.event.update({
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

  await prisma.event.delete({
    where: {
      id: inputId,
    },
  });

  revalidatePath("/");
}

export async function todoStatus(formData: FormData) {
  const inputId = formData.get("inputId") as string;
  const event = await prisma.event.findUnique({
    where: {
      id: inputId,
    },
  });

  if (!event) {
    return;
  }

  //   const updatedStatus = !event.isCompleted;

  await prisma.event.update({
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

export const handleUpdateField = async (
  id: string,
  key: string,
  val: string | number
) => {
  try {
    console.log(key, val);
    const updatedResource = await prisma.event.update({
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
