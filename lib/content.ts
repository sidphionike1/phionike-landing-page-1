import globalData   from "@/content/global.json"
import homeData     from "@/content/home.json"
import servicesData from "@/content/services.json"
import workData     from "@/content/work.json"
import aboutData    from "@/content/about.json"
import {
  globalSchema, homePageSchema, servicesSchema, workPageSchema, aboutPageSchema,
  type GlobalContent, type HomePage, type ServicesPage, type WorkPage, type AboutPage,
} from "@/content/schema"

export async function getGlobalContent():   Promise<GlobalContent> { return globalSchema.parse(globalData) }
export async function getHomePageContent(): Promise<HomePage>       { return homePageSchema.parse(homeData) }
export async function getServicesPageContent(): Promise<ServicesPage>{ return servicesSchema.parse(servicesData) }
export async function getWorkPageContent(): Promise<WorkPage>       { return workPageSchema.parse(workData) }
export async function getAboutPageContent():Promise<AboutPage>      { return aboutPageSchema.parse(aboutData) }
