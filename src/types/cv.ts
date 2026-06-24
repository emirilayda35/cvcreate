export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  avatar: string; // base64 data URL
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface CVData {
  personal: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

export const defaultCVData: CVData = {
  personal: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: "",
    avatar: "",
  },
  experiences: [],
  education: [],
  skills: [],
};

export type LangCode = "tr" | "en" | "de" | "fr";
