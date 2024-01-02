interface ResourceType {
  id: string;
  name: string;
  description: string;
  userId: string | null;
  kinde_id: string;
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

interface SidebarTypes {
  heading: "Templates" | "Campaigns" | "Settings";
  type: "template" | "campaign" | "settings";
  items: ResourceType[] | SidebarSettingsMenuItems[] | undefined;
}

type SidebarSettingsMenuItems = {
  name: "Settings" | "Profile" | "Logout";
  description: string;
  id?: string;
};
