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

const fieldLabelClass =
  'type-sans-regular text-[12px] leading-[normal] tracking-[1px] uppercase text-[#212121]/60 max-md:!font-[400] md:text-[13px] md:leading-[normal] md:tracking-[1px] md:text-[#212121]/60 md:!font-[400]'

const fieldControlClass =
  'type-sans-regular rounded-xl border bg-background p-3.5 text-[14px] leading-[normal] text-[#212121] outline-none transition placeholder:text-[#212121]/60 focus:border-primary max-md:!font-[400] md:p-4 md:text-[14px] md:leading-[normal] md:text-[#212121] md:placeholder:text-[#212121]/60 md:!font-[400]'

function TextField({ id, label, placeholder, value, onChange, error, type = 'text' }: FieldProps) {
  return (
    <div className="flex flex-col gap-2" data-invalid={Boolean(error)}>
      <label htmlFor={id} className={fieldLabelClass}>{label}</label>
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
        className={cn(fieldControlClass, error ? 'border-accent' : 'border-border')}
      />
      {error && <p id={`${id}-error`} className="text-sm text-accent">{error}</p>}
    </div>
  )
}

function MessageField({ value, onChange, error }: Pick<FieldProps, 'value' | 'onChange' | 'error'>) {
  return (
    <div className="flex flex-col gap-2" data-invalid={Boolean(error)}>
      <label htmlFor="message" className={fieldLabelClass}>Your message</label>
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
        className={cn(fieldControlClass, 'min-h-40 resize-y', error ? 'border-accent' : 'border-border')}
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
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 md:gap-5 lg:w-[632px] lg:shrink-0" noValidate>
      <TextField id="name" label="Full name" placeholder="John Doe" value={values.name} onChange={(value) => setValues({ ...values, name: value })} error={errors.name} />
      <TextField id="email" label="Email address" placeholder="john@example.com" value={values.email} onChange={(value) => setValues({ ...values, email: value })} error={errors.email} type="email" />
      <TextField id="subject" label="Subject" placeholder="How can we help you?" value={values.subject} onChange={(value) => setValues({ ...values, subject: value })} error={errors.subject} />
      <MessageField value={values.message} onChange={(value) => setValues({ ...values, message: value })} error={errors.message} />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="type-sans-medium mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[14px] leading-[normal] text-white max-md:!font-[550] disabled:cursor-wait disabled:opacity-60 md:mt-3 md:gap-2.5 md:px-8 md:py-4 md:text-[14px] md:leading-[21px] md:!font-[400]"
      >
        {status === 'loading' ? 'Sending...' : 'Let’s Talk'} <ArrowUpRight aria-hidden="true" />
      </button>
      {status === 'success' && <p role="status" className="flex items-center gap-2 text-primary"><CheckCircle2 aria-hidden="true" /> Thanks — your message has been sent successfully.</p>}
      {status === 'error' && <p role="alert" className="text-accent">Something went wrong. Please try again.</p>}
    </form>
  )
}
