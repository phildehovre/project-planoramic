"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@utils/prisma";

export async function create(userId: string) {
  // const input = formData.get("input") as string;

  // if (!input.trim()) {
  //   return;
  // }

  await prisma.template.create({
    data: {
      name: "Untitled",
      description: "",
      kinde_id: userId,
    },
  });

  revalidatePath("/");
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