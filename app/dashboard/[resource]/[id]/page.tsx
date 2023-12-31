// Import Prisma client
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { getResourceForUserById, getTemplates } from "@prisma/db";

const Page = async ({ params }: any) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const templates = await getTemplates();

  const resource = await getResourceForUserById(
    params.resource,
    user,
    params.id
  );
  console.log(resource);

  return (
    <div>
      <h1>Welcome to the page</h1>
      {/* Render your fetched data here */}
      <ul></ul>
    </div>
  );
};

export default Page;
