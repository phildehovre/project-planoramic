// Import Prisma client
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import {
  getResourceForUserById,
  getTemplates,
  getUniqueTemplateByUser,
} from "@hooks/templates";

const Page = async ({ params }: any) => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  const resource = await getUniqueTemplateByUser(params.id, user);

  console.log(resource);

  return (
    <div>
      <h1>{resource?.name}</h1>
      <p>{resource?.description}</p>
    </div>
  );
};

export default Page;
