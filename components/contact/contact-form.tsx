'use client'

import { FormEvent, useState } from 'react'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type FieldProps = {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  error?: string
  type?: 'text' | 'email'
}

function TextField({ id, label, placeholder, value, onChange, error, type = 'text' }: FieldProps) {
  return (
    <div className="flex flex-col gap-2" data-invalid={Boolean(error)}>
      <label htmlFor={id} className="text-sm uppercase tracking-[0.08em] text-muted-foreground">{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn('min-h-20 rounded-2xl border bg-background px-5 py-4 text-base text-foreground outline-none transition focus:border-primary', error ? 'border-accent' : 'border-border')}
      />
      {error && <p id={`${id}-error`} className="text-sm text-accent">{error}</p>}
    </div>
  )
}

function MessageField({ value, onChange, error }: Pick<FieldProps, 'value' | 'onChange' | 'error'>) {
  return (
    <div className="flex flex-col gap-2" data-invalid={Boolean(error)}>
      <label htmlFor="message" className="text-sm uppercase tracking-[0.08em] text-muted-foreground">Your message</label>
      <textarea
        id="message"
        name="message"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Tell us about your project or inquiry..."
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'message-error' : undefined}
        rows={6}
        className={cn('min-h-48 resize-y rounded-2xl border bg-background px-5 py-4 text-base text-foreground outline-none transition focus:border-primary', error ? 'border-accent' : 'border-border')}
      />
      {error && <p id="message-error" className="text-sm text-accent">{error}</p>}
    </div>
  )
}

export function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function validate() {
    const next: Record<string, string> = {}
    if (!values.name.trim()) next.name = 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Please enter a valid email address.'
    if (!values.subject.trim()) next.subject = 'Please add a subject.'
    if (values.message.trim().length < 10) next.message = 'Please tell us a little more about your project.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) })
      if (!response.ok) throw new Error('Request failed')
      setStatus('success')
      setValues({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
      <TextField id="name" label="Full name" placeholder="John Doe" value={values.name} onChange={(value) => setValues({ ...values, name: value })} error={errors.name} />
      <TextField id="email" label="Email address" placeholder="john@example.com" value={values.email} onChange={(value) => setValues({ ...values, email: value })} error={errors.email} type="email" />
      <TextField id="subject" label="Subject" placeholder="How can we help you?" value={values.subject} onChange={(value) => setValues({ ...values, subject: value })} error={errors.subject} />
      <MessageField value={values.message} onChange={(value) => setValues({ ...values, message: value })} error={errors.message} />
      <button type="submit" disabled={status === 'loading'} className="inline-flex w-fit items-center gap-5 rounded-full bg-ink px-8 py-5 text-lg text-white disabled:cursor-wait disabled:opacity-60">
        {status === 'loading' ? 'Sending...' : 'Let’s Talk'} <ArrowUpRight aria-hidden="true" />
      </button>
      {status === 'success' && <p role="status" className="flex items-center gap-2 text-primary"><CheckCircle2 aria-hidden="true" /> Thanks — your message has been sent successfully.</p>}
      {status === 'error' && <p role="alert" className="text-accent">Something went wrong. Please try again.</p>}
    </form>
  )
}

export function ContactArtwork() {
  return <div className="contact-artwork relative h-72 w-full lg:h-[34rem]" aria-label="Decorative pastel placeholder artwork" role="img"><span /><span /><span /><span /></div>
}
