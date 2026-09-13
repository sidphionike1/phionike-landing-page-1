"use client";

import { motion, cubicBezier, type Variants } from "framer-motion";

/**
 * Forest plan (placeholder copy — final wording TBD):
 * 1. Boxes are visible first
 * 2. Stat text then emerges from inside each box
 */
const stats = [
  {
    value: "300 M",
    label: "People Reached",
  },
  {
    value: "20+",
    label: "Industries",
  },
  {
    value: "2.5M+",
    label: "Monthly Active Users",
  },
  {
    value: "8+",
    label: "Years of Craft",
  },
];

const ease = cubicBezier(0.22, 1, 0.36, 1);

/** Boxes appear first — no slide-in; they simply land in place. */
const boxVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.97,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease,
    },
  },
};

/** Text rises out of the box after the shell is visible. */
const textRevealVariants: Variants = {
  hidden: {
    y: "115%",
  },
  show: {
    y: "0%",
    transition: {
      duration: 0.65,
      ease,
      delay: 0.35,
    },
  },
};

const listVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function OutcomesStatement() {
  return (
    <section className="bg-[#FCFAF7] py-20 lg:py-28">
      <div className="section-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[60%_40%]">
          <div>
            <h2 className="type-sans-regular max-w-[650px] text-center text-lead leading-[125%] text-[#111111] md:text-left md:text-display md:leading-[110%]">
              Design measured by outcomes,
              <br />
              not outputs.
            </h2>

            <p className="type-sans-regular mt-6 max-w-[620px] text-center text-body-lg leading-[160%] text-[#212121]/60 md:text-left md:text-title-sm md:leading-normal md:text-[#212121]">
              Great design isn&apos;t defined by the number of screens delivered.
              It&apos;s measured by the experiences it creates and the value it
              brings to businesses.
            </p>
          </div>
        </div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-16 grid grid-cols-2 gap-4 md:gap-6 lg:mt-20 lg:grid-cols-4 lg:gap-7"
        >
          {stats.map((item) => (
            <motion.div
              key={item.label}
              variants={boxVariants}
              className="flex h-[110px] flex-col justify-between overflow-hidden rounded-[30px] border border-neutral-200 bg-white p-6 md:h-[210px] lg:p-10"
            >
              <div className="overflow-hidden">
                <motion.h3
                  variants={textRevealVariants}
                  className="type-sans-medium text-lead leading-none text-[#111111] md:text-display-xl"
                >
                  {item.value}
                </motion.h3>
              </div>

              <div className="overflow-hidden">
                <motion.p
                  variants={textRevealVariants}
                  className="type-sans-regular text-caption uppercase tracking-[1px] text-[#212121]/60 md:text-body-lg md:text-[#212121]"
                >
                  {item.label}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
