"use client";

import { useState } from "react";
import { FAQS } from "@/content/faq";

const faqs = FAQS;

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#faf8f5] py-16 md:py-28">
      <div className="section-shell">
        {/* Eyebrow — Sans Regular 11 / 16.5 / 2px tracking / uppercase */}
        <p className="type-sans-regular text-caption leading-[16.5px] tracking-[2px] uppercase text-[#212121]/60">
          have a Question?
        </p>

        {/* Heading — Sans Regular 44.8 / 53.76 / #3A39FF */}
        <h2 className="type-sans-regular mt-3 text-faq leading-[40px] text-[#3A39FF] md:mt-4 md:text-display-sm md:leading-[53.76px]">
          We have you covered
        </h2>

        {/* Accordion */}
        <div className="mt-8 md:mt-16">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div key={i} className="border-b border-border/60">
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-start gap-5 py-6 text-left transition-colors hover:opacity-80 md:gap-6 md:py-7"
                >
                  {/* Plus / Minus icon */}
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-[#e85d3f] md:h-6 md:w-6">
                    {isOpen ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    )}
                  </span>

                  {/* Question — Sans Regular 18 / #36454F */}
                  <span className="type-sans-regular text-body-lg leading-normal text-[#36454F] md:text-title-sm">
                    {faq.question}
                  </span>
                </button>

                {/* Answer — Sans Regular 16 / #36454F */}
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="type-sans-regular pb-7 pl-10 pr-4 text-body-lg leading-normal text-[#36454F] md:pl-12">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}