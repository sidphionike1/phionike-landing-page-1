'use client'

import { FormEvent, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const WHATSAPP_NUMBER = '919769904435'

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

function MessageField({
  id,
  value,
  onChange,
  error,
}: Pick<FieldProps, 'value' | 'onChange' | 'error'> & { id: string }) {
  return (
    <div className="flex flex-col gap-2" data-invalid={Boolean(error)}>
      <label htmlFor={id} className={fieldLabelClass}>Your message</label>
      <textarea
        id={id}
        name="message"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Tell us about your project or inquiry..."
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        rows={6}
        className={cn(fieldControlClass, 'min-h-40 resize-y', error ? 'border-accent' : 'border-border')}
      />
      {error && <p id={`${id}-error`} className="text-sm text-accent">{error}</p>}
    </div>
  )
}

export function ContactForm({ idPrefix = '' }: { idPrefix?: string }) {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const next: Record<string, string> = {}
    if (!values.name.trim()) next.name = 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Please enter a valid email address.'
    if (!values.subject.trim()) next.subject = 'Please add a subject.'
    if (values.message.trim().length < 10) next.message = 'Please tell us a little more about your project.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validate()) return

    const text = [
      `Full name: ${values.name.trim()}`,
      `Email address: ${values.email.trim()}`,
      `Subject: ${values.subject.trim()}`,
      `Your message: ${values.message.trim()}`,
    ].join('\n')

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 md:gap-5" noValidate>
      <TextField id={`${idPrefix}name`} label="Full name" placeholder="John Doe" value={values.name} onChange={(value) => setValues({ ...values, name: value })} error={errors.name} />
      <TextField id={`${idPrefix}email`} label="Email address" placeholder="john@example.com" value={values.email} onChange={(value) => setValues({ ...values, email: value })} error={errors.email} type="email" />
      <TextField id={`${idPrefix}subject`} label="Subject" placeholder="How can we help you?" value={values.subject} onChange={(value) => setValues({ ...values, subject: value })} error={errors.subject} />
      <MessageField id={`${idPrefix}message`} value={values.message} onChange={(value) => setValues({ ...values, message: value })} error={errors.message} />
      <button
        type="submit"
        className="type-sans-medium mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[14px] leading-[normal] text-white max-md:!font-[550] md:mt-3 md:gap-2.5 md:px-8 md:py-4 md:text-[14px] md:leading-[21px] md:!font-[400]"
      >
        Let’s Talk <ArrowUpRight aria-hidden="true" />
      </button>
    </form>
  )
}
