import localFont from "next/font/local"

/** Season Sans static cuts — Light 300, Regular 400, Medium 550. */
export const seasonSans = localFont({
  src: [
    { path: "../public/font/Season Sans/SeasonSans-TRIAL-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/font/Season Sans/SeasonSans-TRIAL-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "../public/font/Season Sans/SeasonSans-TRIAL-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/font/Season Sans/SeasonSans-TRIAL-RegularItalic.woff2", weight: "400", style: "italic" },
    { path: "../public/font/Season Sans/SeasonSans-TRIAL-Medium.woff2", weight: "550", style: "normal" },
    { path: "../public/font/Season Sans/SeasonSans-TRIAL-MediumItalic.woff2", weight: "550", style: "italic" },
    { path: "../public/font/Season Sans/SeasonSans-TRIAL-SemiBold.woff2", weight: "650", style: "normal" },
    { path: "../public/font/Season Sans/SeasonSans-TRIAL-Bold.woff2", weight: "750", style: "normal" },
  ],
  variable: "--font-season-sans",
  display: "swap",
})

/** Season VF — Sans Regular (wght 400, SERF 0) and Sans Regular Italic (slnt -11). */
export const seasonVf = localFont({
  src: [
    {
      path: "../public/font/SeasonCollectionVF-TRIAL.woff2",
      weight: "300 900",
      style: "normal",
    },
  ],
  variable: "--font-season-vf",
  display: "swap",
})
