'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  OPEN_SETTINGS_EVENT,
  clearAnalyticsCookies,
  readConsent,
  writeConsent,
} from "@/lib/cookie-consent"

type Panel = "hidden" | "banner" | "settings"

const buttonBase =
  "type-sans-medium inline-flex min-h-11 items-center justify-center rounded-full px-5 text-body-sm leading-[21px] transition-opacity hover:opacity-80"

export function CookieConsent() {
  const [panel, setPanel] = useState<Panel>("hidden")
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    const consent = readConsent()
    setAnalytics(consent?.analytics === true)
    setPanel(consent ? "hidden" : "banner")

    const openSettings = () => {
      setAnalytics(readConsent()?.analytics === true)
      setPanel("settings")
    }
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings)
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings)
  }, [])

  function persist(nextAnalytics: boolean) {
    writeConsent(nextAnalytics)
    if (!nextAnalytics) clearAnalyticsCookies()
    setAnalytics(nextAnalytics)
    setPanel("hidden")
  }

  if (panel === "hidden") return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-[5%] pb-4 md:px-0 md:pb-6">
      <section
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-copy"
        className="mx-auto w-full max-w-[1200px] rounded-xl border border-border bg-white p-5 shadow-[0_12px_40px_rgba(17,17,17,0.08)] md:p-6"
      >
        {panel === "banner" ? (
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <h2 id="cookie-consent-title" className="type-sans-medium text-title-sm leading-normal text-[#111111]">
                Cookies on this site
              </h2>
              <p id="cookie-consent-copy" className="type-sans-regular mt-2 text-body-sm leading-[160%] text-[#212121]/80">
                Essential cookies keep the site working and remember this choice.
              </p>
              <p className="type-sans-regular mt-3 text-eyebrow leading-[18px] text-[#212121]/60">
                <Link href="/cookies" className="underline underline-offset-2 hover:opacity-70">
                  Cookie Policy
                </Link>
                <span aria-hidden="true"> · </span>
                <Link href="/privacy" className="underline underline-offset-2 hover:opacity-70">
                  Privacy Policy
                </Link>
              </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:justify-end">
              <button
                type="button"
                onClick={() => persist(false)}
                className={`${buttonBase} border border-[#212121] bg-transparent text-[#212121] sm:min-w-[132px]`}
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => persist(true)}
                className={`${buttonBase} bg-ink text-white sm:min-w-[132px]`}
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={() => setPanel("settings")}
                className={`${buttonBase} col-span-2 border border-[#212121] bg-transparent text-[#212121] sm:min-w-[132px]`}
              >
                Settings
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 id="cookie-consent-title" className="type-sans-medium text-title-sm leading-normal text-[#111111]">
              Cookie settings
            </h2>
            <p id="cookie-consent-copy" className="type-sans-regular mt-2 max-w-2xl text-body-sm leading-[160%] text-[#212121]/80">
              Choose which cookies we can use. Necessary cookies are always on because they store this preference and keep
              the site working.
            </p>

            <div className="mt-5 space-y-3">
              <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-[#FFFCF7] p-4">
                <div>
                  <p className="type-sans-medium text-body-sm leading-normal text-[#111111]">Necessary</p>
                  <p className="type-sans-regular mt-1 text-eyebrow leading-[160%] text-[#212121]/60">
                    Required to remember your consent and operate the website. Always on.
                  </p>
                </div>
                <span className="type-sans-regular shrink-0 text-eyebrow text-[#212121]/60">On</span>
              </div>

              <label className="flex items-start justify-between gap-4 rounded-xl border border-border bg-[#FFFCF7] p-4">
                <span>
                  <span className="type-sans-medium block text-body-sm leading-normal text-[#111111]">Analytics</span>
                  <span className="type-sans-regular mt-1 block text-eyebrow leading-[160%] text-[#212121]/60">
                    Microsoft Clarity, including session recordings, and Vercel Web Analytics. Off unless you switch this on.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#111111]"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setPanel(readConsent() ? "hidden" : "banner")}
                className={`${buttonBase} border border-[#212121] bg-transparent text-[#212121]`}
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => persist(analytics)}
                className={`${buttonBase} bg-ink text-white`}
              >
                Save preferences
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
      className={className}
    >
      Cookie settings
    </button>
  )
}
