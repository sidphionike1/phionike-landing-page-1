"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play } from "lucide-react"
import type { HomePage } from "@/content/schema"

export function ShowreelSection({ content }: { content: HomePage["showreel"] }) {
  const [playing,setPlaying]=useState(false)
  return <section className="hidden bg-background px-6 pb-24 md:block"><div className="relative mx-auto aspect-[21/9] max-w-7xl overflow-hidden rounded-[2rem] bg-ink text-primary-foreground">
    {playing ? <video className="size-full object-cover" src={content.videoUrl} controls autoPlay playsInline /> : <><Image src="/showreel/poster.png" alt="Phionike studio showreel poster" fill className="object-cover" sizes="100vw"/><div className="absolute inset-0 bg-ink/40"/><p className="absolute left-8 top-8 text-sm">{content.title} · {content.duration}</p><p className="absolute bottom-8 left-8 max-w-md text-sm leading-relaxed">{content.caption}</p><a href={content.cta.href} className="absolute bottom-8 right-8 border-b pb-1 text-sm">{content.cta.label}</a><motion.button whileHover={{scale:1.08}} onClick={()=>setPlaying(true)} className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary-foreground/40 bg-primary-foreground/20 backdrop-blur" aria-label={content.title}><Play fill="currentColor"/></motion.button></>}
  </div></section>
}
