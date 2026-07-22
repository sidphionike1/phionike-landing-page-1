import globalData from "@/content/global.json"
import homeData from "@/content/home.json"
import servicesData from "@/content/services.json"
import workData from "@/content/work.json"
import { globalSchema, homePageSchema, servicesSchema, workPageSchema, type GlobalContent, type HomePage, type ServicesPage, type WorkPage } from "@/content/schema"
export async function getGlobalContent():Promise<GlobalContent>{return globalSchema.parse(globalData)}
export async function getHomePageContent():Promise<HomePage>{return homePageSchema.parse(homeData)}
export async function getServicesPageContent():Promise<ServicesPage>{return servicesSchema.parse(servicesData)}
export async function getWorkPageContent():Promise<WorkPage>{return workPageSchema.parse(workData)}
