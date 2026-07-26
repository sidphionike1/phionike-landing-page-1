"use client"

import { motion } from "framer-motion";

const stats = [
  {
    value: "300M+",
    label: "PEOPLE REACHED",
  },
  {
    value: "20+",
    label: "INDUSTRIES SERVED",
  },
  {
    value: "2.5M+",
    label: "MONTHLY ACTIVE USERS",
  },
  {
    value: "8+",
    label: "YEARS OF CRAFT",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    x: -80,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function OutcomesStatement() {
  return (
    <section className="bg-[#FCFAF7] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid items-center gap-10 lg:grid-cols-[60%_40%]">
          {/* Left */}
          <div>
            <h2 className="text-center md:text-left max-w-[650px] text-[28px] font-light leading-[1.15] tracking-[-0.03em] text-neutral-900 lg:text-[40px] lg:leading-[1.08]">
              Design measured by outcomes,
              <br />
              not outputs.
            </h2>

            <p className="text-center md:text-left mt-6 max-w-[620px] text-[16px] leading-7 text-neutral-600 lg:text-[18px] lg:leading-8">
              Great design isn't defined by the number of screens delivered.
              It's measured by the experiences it creates and the value it
              brings to businesses.
            </p>
          </div>

          {/* Desktop Illustration */}
          <div className="hidden lg:flex justify-center">
            <img
              src="https://placehold.co/420x420/F8F7F5/CFCFCF?text=Illustration"
              alt="Illustration"
              className="w-full max-w-[420px]"
            />
          </div>
        </div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="mt-16 grid grid-cols-2 gap-4 md:gap-6 lg:mt-20 lg:grid-cols-4 lg:gap-7"
        >
          {stats.map((item) => (
            <motion.div
              key={item.label}
              variants={cardVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.2 },
              }}
              className="flex h-[110px] flex-col justify-between rounded-[30px] border border-neutral-200 bg-white p-6 md:h-[210px] lg:p-10"
            >
              <h3 className="text-[28px] font-light leading-none tracking-[-0.03em] text-neutral-900 lg:text-[40px]">
                {item.value}
              </h3>

              <p className="text-[12px] uppercase tracking-wide text-neutral-500 md:text-[12px]">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}