import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateUserResult {
  data?: any;
  isLoading: boolean;
  error?: Error;
}

export async function createUser(userData: any): Promise<CreateUserResult> {
  let isLoading = true;
  let error: any = null;
  let user: any = null;

  try {
    // Check if the user already exists based on email
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      // User already exists, handle accordingly (throw an error, return, etc.)
      throw new Error("User with this email already exists");
    }

    // If the user doesn't exist, create a new user
    const createdUser = await prisma.user.create({
      data: {
        family_name: userData.family_name,
        given_name: userData.given_name,
        email: userData.email,
      },
    });

    user = createdUser;
  } catch (err: unknown) {
    error = err;
  } finally {
    isLoading = false;
  }

  return { data: user, isLoading, error };
}

export async function createTemplate(
  userId: string,
  templateData?: ResourceType
) {
  let isLoading = true;
  let error: any = null;
  let data: any;

  try {
    if (!userId) {
      error = new Error("No user id provided");
      return;
    }
    const { name, description } = templateData || {
      name: "New template",
      description: "New template",
    };
    const template = await prisma.template.create({
      data: {
        name,
        description,
        userId,
      },
    });
    data = template;
  } catch (err: any) {
    error = err;
  } finally {
    isLoading = false;
  }
  console.log(data, isLoading, error);
  return { data, isLoading, error };
}
