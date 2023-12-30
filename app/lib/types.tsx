interface RessourceType {
  id: string;
  name: string;
  description: string;
  created_by: string;
  userId: string;
}

interface CampaignType extends RessourceType {
  generated_from: string;
  templateId: string;
}

interface TemplateType extends RessourceType {
  Campaign: CampaignType[];
}
