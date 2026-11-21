import { z } from 'zod'

/** Minimum time (ms) between the form rendering and submission; faster submits are treated as bots. */
export const MIN_FILL_MS = 3000

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100, 'Name is too long.'),
  email: z.string().trim().max(200, 'Email is too long.').pipe(z.email('Please enter a valid email address.')),
  company: z.string().trim().max(120, 'Company name is too long.').optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(10, 'Message should be at least 10 characters.')
    .max(5000, 'Message is too long (5,000 characters max).'),
  // Honeypot: real users never see or fill this field.
  website: z.string().max(0).optional().or(z.literal('')),
  startedAt: z.coerce.number().int().positive(),
})

export type ContactInput = z.infer<typeof contactSchema>

export type ContactFieldErrors = Partial<Record<'name' | 'email' | 'company' | 'message', string>>

export type ContactState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string; fieldErrors?: ContactFieldErrors; values?: Partial<Record<'name' | 'email' | 'company' | 'message', string>> }
