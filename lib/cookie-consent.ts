export const CONSENT_COOKIE = "phionike_cookie_consent"
export const CONSENT_STORAGE_KEY = "phionike_cookie_consent"
export const CONSENT_VERSION = 1
export const CONSENT_MAX_AGE_DAYS = 180
export const CONSENT_CHANGE_EVENT = "phionike:consent-change"
export const OPEN_SETTINGS_EVENT = "phionike:open-cookie-settings"

export type ConsentState = {
  version: number
  necessary: true
  analytics: boolean
  updatedAt: string
}

function maxAgeSeconds() {
  return CONSENT_MAX_AGE_DAYS * 24 * 60 * 60
}

function parseConsent(raw: string | null | undefined): ConsentState | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>
    if (parsed.version !== CONSENT_VERSION) return null
    if (typeof parsed.analytics !== "boolean") return null
    return {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: parsed.analytics,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
    }
  } catch {
    return null
  }
}

function readCookie(name: string) {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null
  return parseConsent(readCookie(CONSENT_COOKIE)) ?? parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY))
}

export function writeConsent(analytics: boolean): ConsentState {
  const state: ConsentState = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics,
    updatedAt: new Date().toISOString(),
  }
  const value = JSON.stringify(state)
  const secure = window.location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds()}; SameSite=Lax${secure}`
  window.localStorage.setItem(CONSENT_STORAGE_KEY, value)
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
  return state
}

export function clearAnalyticsCookies() {
  if (typeof document === "undefined") return
  for (const name of ["_clck", "_clsk"]) {
    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`
  }
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))
}
