import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateUserResult {
  data?: any;
  isLoading: boolean;
  error?: Error;
}

export async function createUser(userData: any): Promise<CreateUserResult> {
  let isLoading = true;
  let error: Error | undefined | null = null;
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
  } catch (err) {
    error = err;
  } finally {
    isLoading = false;
  }

  return { data: user, isLoading, error };
}

export async function deleteUser(userData: any) {
  let isLoading = true;
  let error: Error | undefined | null = null;
  var status: String | Error | null = null;

  try {
    // Check if the user already exists based on email
    const existingUser = await prisma.user.delete({
      where: { email: userData.email },
    });
    status = "success";
  } catch (err: any) {
    error = new Error(err);
    status = "error";
  } finally {
    isLoading = false;
  }

  return { data: status, isLoading, error };
}

//   const allUsers = await prisma.user.findMany({
//     include: {
//       posts: true,
//     },
//   });
//   console.dir(allUsers, { depth: null });
// }
// main()
//   .catch(async (e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
