// Import Prisma client
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import {
  getEventsByTemplateId,
  getUniqueTemplateByUser,
} from "@hooks/templates";
import ResourceHeader from "@components/ui/ResourceHeader";
import ResourceTable from "@components/ui/ResourceTable";

const Page = async ({ params }: any) => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  const resource = await getUniqueTemplateByUser(params.id, user);
  const events = await getEventsByTemplateId(params.id, user);

  return (
    <div>
      <ResourceHeader
        id={params.id}
        type={params.resource}
        resource={resource as ResourceType}
      />
      <ResourceTable events={events} />
    </div>
  );
};

export default Page;
