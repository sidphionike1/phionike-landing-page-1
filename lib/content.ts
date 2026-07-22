import globalData from "@/content/global.json"
import homeData from "@/content/home.json"
import servicesData from "@/content/services.json"
import { globalSchema, homePageSchema, servicesSchema, type GlobalContent, type HomePage, type ServicesPage } from "@/content/schema"
export async function getGlobalContent():Promise<GlobalContent>{return globalSchema.parse(globalData)}
export async function getHomePageContent():Promise<HomePage>{return homePageSchema.parse(homeData)}
export async function getServicesPageContent():Promise<ServicesPage>{return servicesSchema.parse(servicesData)}
