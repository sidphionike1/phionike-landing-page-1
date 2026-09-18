'use client'

import { Lottie } from 'lottie-react'

/** Intrinsic Lottie canvas size from cards.json */
const LOTTIE_W = 1028
const LOTTIE_H = 669

/**
 * Hero visual — Lottie cards animation.
 * Canvas padding is clipped; animation is scaled ~2.5× so the boxes read large.
 * Previous geometric composition kept below (commented) for reference.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[790px] lg:mx-0 lg:w-[min(790px,52vw)]">
      {/* Viewport crops empty Lottie padding; inner layer scales the cards up */}
      <div className="relative h-[270px] w-full overflow-hidden sm:h-[350px] lg:h-[530px]">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 origin-center [--hero-lottie-scale:0.6] lg:[--hero-lottie-scale:1.12]"
          style={{
            width: LOTTIE_W,
            height: LOTTIE_H,
            transform:
              'translate(-49%, -50%) scale(var(--hero-lottie-scale))',
          }}
        >
          <Lottie
            src="/lottie/cards.json"
            autoplay
            loop
            style={{ width: LOTTIE_W, height: LOTTIE_H }}
          />
        </div>
      </div>

      <p className="type-sans-medium mr-[10px] mt-2 text-right text-caption leading-[16.5px] tracking-[3.3px] uppercase text-[#36454F]/60">
        DESIGN & STRATEGY STUDIO
      </p>
    </div>
  )
}

/*
 * Previous pixel-perfect geometric composition (replaced by Lottie):
 *
 * export function HeroVisual() {
 *   return (
 *     <div className="flex flex-col gap-4">
 *       <div style={{ position: 'relative', width: '621px', height: '487px' }}>
 *         <div style={{ position: 'absolute', left: '0px', top: '327px', width: '172px', height: '160px', borderRadius: '30px', backgroundColor: '#CDAAF5' }} />
 *         <div style={{ position: 'absolute', left: '192px', top: '327px', width: '172px', height: '160px', borderRadius: '30px', backgroundColor: '#3F39F6' }} />
 *         <div style={{ position: 'absolute', left: '96px', top: '0px', width: '268px', height: '303px', borderRadius: '30px', backgroundColor: '#FF5A1F' }} />
 *         <div style={{ position: 'absolute', left: '388px', top: '207px', width: '233px', height: '280px', borderRadius: '30px', backgroundColor: '#F5B800' }} />
 *         <div style={{ position: 'absolute', left: '484px', top: '83px', width: '106.41px', height: '99.70px', borderRadius: '30px', backgroundColor: '#F5B800', transform: 'rotate(-0.24deg)' }} />
 *       </div>
 *       <p className="type-sans-medium text-caption tracking-[3.3px] text-right leading-[16.5px] uppercase text-[#36454F]/60">
 *         DESIGN & STRATEGY STUDIO
 *       </p>
 *     </div>
 *   )
 * }
 */
