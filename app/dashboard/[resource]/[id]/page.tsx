import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  getEventsByTemplateId,
  getUniqueTemplateByUser,
} from "@hooks/templates";
import ResourceHeader from "@components/ui/ResourceHeader";
import ResourceTable from "@components/ui/ResourceTable";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { redirect } from "next/navigation";
import {
  getCampaignEvents,
  getEventsByCampaignId,
  getUniqueCampaignByUser,
} from "@hooks/campaigns";
import { calculateDateWithOffset } from "@utils/helpers";

const Page = async ({ params }: any) => {
  const { getUser } = getKindeServerSession();

  const user = (await getUser()) as KindeUser;
  const resource =
    params.resource === "template"
      ? ((await getUniqueTemplateByUser(params.id, user)) as TemplateType)
      : ((await getUniqueCampaignByUser(params.id, user)) as CampaignType);

  const allEvents: any =
    params.resource === "template"
      ? ((await getEventsByTemplateId(params.id, user)) as
          | EventType[]
          | undefined)
      : ((await getEventsByCampaignId(params.id, user)) as
          | EventType[]
          | undefined);

  const campaignEvents = allEvents
    .filter((event: EventType) => event.type === `campaign_event`)
    .map((event: EventType) => {
      return {
        ...event,
        date: calculateDateWithOffset(
          // @ts-ignore
          resource.target_date,
          event.unit,
          event.range
        ),
      } as EventType;
    });

  const templateEvents = allEvents.filter(
    (event: EventType) => event.type === `template_event`
  );
  const events =
    params.resource === "template" ? templateEvents : campaignEvents;
  return (
    <div>
      <ResourceHeader
        resourceId={params.id}
        type={params.resource}
        resource={resource}
        events={events}
      />
      <ResourceTable
        events={events}
        resource={resource}
        user={user}
        type={params.resource}
      />
    </div>
  );
};

export default Page;
