"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What makes Phionike different from other design agencies?",
    answer:
      "Phionike combines research, strategy, design, and technology to create solutions that solve real business and user problems—not just visually appealing interfaces.",
  },
  {
    question: "What services does Phionike offer?",
    answer:
      "We offer end-to-end product design including UX research, UI design, design systems, prototyping, usability testing, and design strategy for digital products across web and mobile.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope. A focused UX audit takes 2–3 weeks, while a full product design engagement typically spans 8–12 weeks. We tailor timelines to your goals.",
  },
  {
    question: "What deliverables do clients receive after UX research?",
    answer:
      "Clients receive a comprehensive research report with user personas, journey maps, usability findings, prioritized recommendations, and actionable next steps for design and development.",
  },
  {
    question: "Can you help improve an existing SaaS platform?",
    answer:
      "Absolutely. We specialize in redesigning and repositioning legacy platforms—improving UX, modernizing UI, and aligning the product with current user expectations and business goals.",
  },
  {
    question: "Can you build a scalable design system for our product?",
    answer:
      "Yes. We design and document component libraries, tokens, patterns, and usage guidelines that scale with your team and ensure consistency across all touchpoints.",
  },
  {
    question: "How does Phionike collaborate with client teams?",
    answer:
      "We embed closely with your team through weekly syncs, shared Figma files, and Slack channels. Our process is transparent, iterative, and built around continuous feedback.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#faf8f5] py-20 md:py-28">
      {/* Container: 90% mobile | 20px padding tablet | 1198px cap desktop */}
      <div className="mx-auto w-[90%] md:w-full md:px-5 min-[1198px]:max-w-[1198px] min-[1198px]:px-0">
        {/* Eyebrow */}
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
          Have a question?
        </p>

        {/* Heading */}
        <h2 className="mt-4 text-[40px] font-light leading-[1.15] tracking-tight text-[#3b5bdb] md:text-[48px]">
          We have you covered
        </h2>

        {/* Accordion */}
        <div className="mt-16">
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

                  {/* Question */}
                  <span className="text-lg font-normal leading-snug text-foreground md:text-xl">
                    {faq.question}
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-7 pl-10 pr-4 text-base leading-relaxed text-muted-foreground md:pl-12 md:text-lg">
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