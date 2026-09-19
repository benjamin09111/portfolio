import { schemas } from "@/lib/schemas";

import siteJson from "@/data/site.json";
import navigationJson from "@/data/navigation.json";
import uiJson from "@/data/ui.json";
import heroJson from "@/data/hero.json";
import experienceJson from "@/data/experience.json";
import projectsJson from "@/data/projects.json";
import technologiesJson from "@/data/technologies.json";
import educationJson from "@/data/education.json";
import aboutJson from "@/data/about.json";
import contactJson from "@/data/contact.json";
import sectionsJson from "@/data/sections.json";

export const site = schemas.site.parse(siteJson);
export const navigation = schemas.navigation.parse(navigationJson);
export const ui = schemas.ui.parse(uiJson);
export const hero = schemas.hero.parse(heroJson);
export const experience = schemas.experience.parse(experienceJson);
export const projects = schemas.projects.parse(projectsJson);
export const technologies = schemas.technologies.parse(technologiesJson);
export const education = schemas.education.parse(educationJson);
export const about = schemas.about.parse(aboutJson);
export const contact = schemas.contact.parse(contactJson);
export const sections = sectionsJson;
