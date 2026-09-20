'use client'

import { Lottie } from 'lottie-react'

export function HeroVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-[790px] flex-col-reverse gap-4 lg:mx-0 lg:w-[min(790px,52vw)] lg:flex-col lg:gap-0">
      <div className="relative w-full overflow-hidden max-lg:-translate-y-2.5" style={{ aspectRatio: "1.398" }}>
        <Lottie
          src="/Cardds.json"
          className="absolute inset-0 h-full w-full origin-center scale-[1.11] lg:translate-x-2.5 lg:translate-y-2.5"
          autoplay
          loop
          aria-label="Hero cards"
        />
      </div>

      <p className="type-sans-medium mr-[10px] text-left text-caption leading-[16.5px] tracking-[3.3px] uppercase text-[#36454F]/60 lg:relative lg:left-[-25px] lg:mt-2 lg:mr-0 lg:w-full lg:text-right">
        DESIGN & STRATEGY STUDIO
      </p>
    </div>
  )
}
