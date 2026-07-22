"use client"

import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowUpRight, ChevronDown } from "lucide-react"
import type { PortfolioSection } from "@/content/schema"

export function PortfolioFilterGrid({ content, compact = false }: { content: PortfolioSection; compact?: boolean }) {
  const params = useSearchParams(); const router = useRouter(); const sector = params.get("sector"); const discipline = params.get("discipline")
  const items = content.items.filter(i => (!sector || i.sectors.includes(sector)) && (!discipline || i.discipline === discipline)).sort((a,b)=>a.variant === "darkPhoneTriple" ? -1 : b.variant === "darkPhoneTriple" ? 1 : 0)
  const clear = () => router.replace(compact ? "#portfolio" : "#work", { scroll: false })
  return <section id={compact ? "portfolio" : "work"} className="bg-background py-14 md:py-20"><div className="mx-auto max-w-7xl px-5 md:px-6">
    {compact ? (
      <div><p className="text-xl font-medium md:text-2xl">{content.eyebrow}</p><p className="mt-1 text-sm text-muted-foreground">{content.heading}</p></div>
    ) : (
      <h2 className="max-w-2xl text-4xl tracking-tight md:text-6xl">{content.eyebrow}<em className="block text-muted-foreground">{content.heading}</em></h2>
    )}
    <div className="mt-6 flex flex-wrap gap-3">{content.filters.map((filter,i)=><button key={filter} onClick={i===0?clear:undefined} className={`flex items-center gap-2 rounded-full border px-5 py-2 text-sm ${i===0 && !sector && !discipline ? "border-primary bg-primary text-primary-foreground":"border-border"}`}>{filter}{i>0&&<ChevronDown size={13}/>}</button>)}</div>
    <motion.div layout className="mt-14 columns-1 gap-7 md:columns-2 lg:columns-3">{items.map((item,index)=><motion.article layout key={item.id} className="mb-12 break-inside-avoid"><div className={`relative overflow-hidden rounded-2xl ${item.variant === "darkPhoneTriple" ? "bg-ink p-3" : "bg-card"}`}><Image src={index === 0 && item.variant !== "darkPhoneTriple" ? "/portfolio/oren-dashboard-1.png" : item.variant === "darkPhoneTriple" ? item.mockupSrc : "/portfolio/oren-dashboard-1.png"} alt="Product interface case study" width={1200} height={800} className="h-auto w-full rounded-xl object-cover" sizes="(max-width:768px) 100vw, 33vw"/></div><h3 className="mt-6 text-2xl tracking-tight">{item.title}</h3><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.tagline}</p></motion.article>)}</motion.div>
    {items.length===0&&<p className="py-20 text-center text-muted-foreground">{content.eyebrow}</p>}<a href="/work" className="mx-auto mt-8 flex w-fit items-center gap-2 border-b border-foreground pb-1 text-sm">{content.filters[0]}<ArrowUpRight size={14}/></a>
  </div></section>
}
