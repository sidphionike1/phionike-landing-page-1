"use client"
import { motion } from "framer-motion"
import { Search, PenTool, Hammer, TrendingUp } from "lucide-react"
import type { GlobalContent } from "@/content/schema"
const icons={Search,PenTool,Hammer,TrendingUp}; const colors={cobalt:"bg-primary text-primary-foreground",lavender:"bg-lavender text-foreground",terracotta:"bg-accent text-accent-foreground",mustard:"bg-mustard text-foreground"}
export function ProcessCardStack({steps}:{steps:GlobalContent["processSteps"]}){return <div className="relative flex flex-col gap-4 md:h-[560px]">{steps.map((s,i)=>{const Icon=icons[s.icon as keyof typeof icons]??Search;return <motion.article key={s.id} whileHover={{scale:1.03,zIndex:50}} className={`rounded-[2rem] border border-border/40 p-8 shadow-md md:absolute md:h-72 md:w-[72%] ${colors[s.bandColor]}`} style={{top:i*72,left:i*8,zIndex:(i+1)*10}}><div className="flex items-center justify-between"><span className="text-sm">{s.number}</span><Icon aria-hidden size={24}/></div><h2 className="mt-20 text-3xl font-medium">{s.heroLabel}</h2><p className="mt-2 text-sm opacity-75">{s.shortDescription}</p></motion.article>})}</div>}
