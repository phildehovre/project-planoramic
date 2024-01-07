import { updateField } from "./actions";

export const handlePublishCampaign = async (id: string) => {
  const res = await updateField("campaign", id, "published", true);
  console.log(id);
};
