interface ResourceType {
  id: string;
  name: string;
  description: string;
  created_by: string;
  userId: string;
}

interface CampaignType extends ResourceType {
  generated_from: string;
  templateId: string;
}

interface TemplateType extends ResourceType {
  Campaign: CampaignType[];
}

interface User {
  id: string;
  email: string;
  family_name?: string | null;
  given_name?: string | null;
  name?: string | null;
  Templates?: TemplateType[];
  Campaigns?: CampaignType[];
  Events?: Event[];
}
