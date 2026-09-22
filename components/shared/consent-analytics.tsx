'use client'

import { useEffect, useState } from "react"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { CONSENT_CHANGE_EVENT, readConsent } from "@/lib/cookie-consent"

export function ConsentAnalytics() {
  const [allowAnalytics, setAllowAnalytics] = useState(false)

  useEffect(() => {
    const sync = () => setAllowAnalytics(readConsent()?.analytics === true)
    sync()
    window.addEventListener(CONSENT_CHANGE_EVENT, sync)
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, sync)
  }, [])

  if (process.env.NODE_ENV !== "production" || !allowAnalytics) return null

  return (
    <>
      <Analytics />
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "yl7tdp9kvy");
        `}
      </Script>
    </>
  )
}
