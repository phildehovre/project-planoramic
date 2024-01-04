// Import Prisma client
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import {
  getEventsByTemplateId,
  getUniqueTemplateByUser,
} from "@hooks/templates";
import ResourceHeader from "@components/ui/ResourceHeader";
import ResourceTable from "@components/ui/ResourceTable";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";

const Page = async ({ params }: any) => {
  const { getUser } = getKindeServerSession();

  const user = (await getUser()) as KindeUser;
  const resource = (await getUniqueTemplateByUser(
    params.id,
    user
  )) as ResourceType;
  const events = (await getEventsByTemplateId(params.id, user)) as EventType[];

  return (
    <div>
      <ResourceHeader
        id={params.id}
        type={params.resource}
        resource={resource}
      />
      <ResourceTable events={events} resource={resource} user={user} />
    </div>
  );
};

export default Page;
