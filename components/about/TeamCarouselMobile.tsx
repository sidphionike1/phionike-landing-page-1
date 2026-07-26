"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ACCENT_HEX, ACCENT_TEXT, TEAM_MEMBERS } from "./team-data";

// Simple swipeable carousel for mobile. No external carousel library —
// native horizontal scroll-snap gives smooth, inertial, touch-native
// swiping for free, plus a peek of the next card and dot indicators.
export function TeamCarouselMobile() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track which card is currently centered/active, to drive the dots.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const cardWidth = track.firstElementChild
        ? (track.firstElementChild as HTMLElement).offsetWidth + 16 // + gap
        : 1;
      const index = Math.round(track.scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(index, 0), TEAM_MEMBERS.length - 1));
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (card) {
      track.scrollTo({ left: card.offsetLeft - 20, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-background px-0 py-10 md:hidden">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.id}
            className="relative shrink-0 snap-center overflow-hidden rounded-[28px]"
            style={{ width: "78vw", maxWidth: 340, aspectRatio: "3 / 4" }}
          >
            <Image
              src={member.photoSrc}
              alt={member.hasData ? member.name : ""}
              fill
              className="object-cover"
              sizes="80vw"
              quality={85}
            />
            <div
              className={`absolute inset-x-0 bottom-0 px-5 py-4 ${ACCENT_TEXT[member.accent]}`}
              style={{ backgroundColor: ACCENT_HEX[member.accent] }}
            >
              <h3 className="text-lg font-semibold leading-tight">{member.name}</h3>
              <p className="mt-0.5 text-sm opacity-80">{member.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {TEAM_MEMBERS.map((member, index) => (
          <button
            key={member.id}
            type="button"
            aria-label={`Go to ${member.hasData ? member.name : "team member"} card`}
            onClick={() => scrollToIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
              index === activeIndex ? "w-6 bg-foreground" : "w-1.5 bg-foreground/25"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
