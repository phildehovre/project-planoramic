import {
  getEventsByTemplateId,
  getUniqueTemplateByUser,
} from "@hooks/templates";
import ResourceHeader from "@components/ui/ResourceHeader";
import ResourceTable from "@components/ui/ResourceTable";
import {
  getEventsByCampaignId,
  getUniqueCampaignByUser,
} from "@hooks/campaigns";
import dayjs from "dayjs";
import Spinner from "@components/Spinner";
import { checkForPhaseOverlap } from "@utils/helpers";
import { auth, currentUser } from "@clerk/nextjs";

const Page = async ({ params }: any) => {
  const authUser = await currentUser();

  const user = {
    id: authUser?.id,
    clerk_id: authUser?.id,
    email: authUser?.emailAddresses[0]?.emailAddress,
    firstname: authUser?.firstName,
    lastname: authUser?.lastName,
    name: "",
  };

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
        date: dayjs(event.date).format("ddd DD MMM YYYY"),
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
      {events && resource ? (
        <ResourceTable
          events={events}
          resource={resource}
          user={user}
          type={params.resource}
        />
      ) : (
        <Spinner loading={true} />
      )}
    </div>
  );
};

export default Page;
