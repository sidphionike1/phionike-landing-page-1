import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160),
  subject: z.string().trim().min(2).max(160),
  message: z.string().trim().min(10).max(5000),
})

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const result = contactSchema.safeParse(body)
  if (!result.success) return NextResponse.json({ message: 'Please check the form fields.' }, { status: 400 })

  await new Promise((resolve) => setTimeout(resolve, 700))
  return NextResponse.json({ message: 'Contact request received successfully.' }, { status: 200 })
}
