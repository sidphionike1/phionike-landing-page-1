"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ArrowUpRight } from "lucide-react"
import type { HomePage } from "@/content/schema"

export function VennDiagramSection({ content }: { content: HomePage["venn"] }) {
  const router = useRouter(); const params = useSearchParams()
  const select = (kind: "discipline" | "sector", id: string) => { const next = new URLSearchParams(params.toString()); next.set(kind, id); router.replace(`?${next.toString()}#work`, { scroll: false }) }
  return <section className="bg-background py-20 md:py-28"><div className="mx-auto max-w-7xl px-5 md:px-6">
    <p className="eyebrow">{content.eyebrow}</p><h2 className="mt-5 max-w-2xl text-4xl font-medium tracking-tight md:text-6xl">{content.heading}<em className="block text-muted-foreground">{content.subheading}</em></h2>
    <div className="mt-14 grid gap-16 md:grid-cols-2 md:items-center">
      <div className="relative mx-auto h-64 w-full max-w-md md:aspect-square md:h-auto"><div className="absolute left-0 top-6 h-52 w-3/5 rounded-[5rem] bg-peach md:h-72"/><div className="absolute right-0 top-6 h-52 w-3/5 rounded-[5rem] bg-lavender md:h-72"/><div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2">{content.disciplines.map(d => <button key={d.id} onClick={() => select("discipline", d.id)} className="rounded-full bg-foreground px-4 py-2 text-xs text-background transition-transform hover:scale-105">{d.label}</button>)}</div>{content.sectors.map((s,i)=><button key={s.id} onClick={()=>select("sector",s.id)} className="absolute z-20 hidden rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground md:block" style={{left:`${[2,25,61,72,7,65,20,48][i]}%`,top:`${[4,0,5,28,70,72,90,92][i]}%`}}>{s.label}</button>)}</div>
      <div><p className="max-w-lg text-2xl leading-snug">{content.supportCopy}</p><div className="mt-10 border-t border-border pt-8">{content.stats.map((stat,i)=><div key={stat.label} className="flex items-center gap-4 py-2"><span className={`size-3 ${i===0?"bg-foreground":i===1?"border border-border":"bg-border"}`}/><span className="text-lg font-medium">{stat.value}</span><span className="italic text-muted-foreground">{stat.label}</span></div>)}</div><a href={content.cta.href} className="mt-10 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm">{content.cta.label}<ArrowUpRight size={14}/></a></div>
    </div>
  </div></section>
}
