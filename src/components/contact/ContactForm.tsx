'use client'

import { useActionState, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { getContactToken, sendContact } from '@/app/actions/contact'
import { LIMITS, type ContactField, type ContactState } from '@/lib/contact-schema'
import { CheckIcon } from '@/components/site/icons'

const initialState: ContactState = { status: 'idle' }

/** Keep in sync with TOKEN_MIN_AGE_MS on the server (submitting sooner is treated as a bot). */
const TOKEN_MIN_AGE_MS = 2600
const TOKEN_REFRESH_MS = 100 * 60 * 1000
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

function Field({
  name,
  label,
  type = 'text',
  required,
  autoComplete,
  textarea,
  error,
  defaultValue,
  placeholder,
  maxLength,
  minLength,
  inputMode,
  onInput,
  hint,
}: {
  name: ContactField
  label: string
  type?: string
  required?: boolean
  autoComplete?: string
  textarea?: boolean
  error?: string
  defaultValue?: string
  placeholder?: string
  maxLength: number
  minLength?: number
  inputMode?: 'text' | 'email'
  onInput?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  hint?: React.ReactNode
}) {
  const id = useId()
  const errId = `${id}-error`
  const cls =
    'peer w-full rounded-xl border bg-bg/60 px-4 py-3 text-fg placeholder:text-muted/60 outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_20%,transparent),0_0_24px_color-mix(in_srgb,var(--accent)_25%,transparent)] ' +
    (error ? 'border-rose-400/70' : 'border-line')
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-center justify-between font-mono text-xs tracking-wider text-muted uppercase">
        <span>
          {label}
          {required && <span className="text-accent"> *</span>}
        </span>
        {!required && <span className="normal-case tracking-normal opacity-70">optional</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={6}
          maxLength={maxLength}
          minLength={minLength}
          onInput={onInput}
          defaultValue={defaultValue}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errId : undefined}
          className={`${cls} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          inputMode={inputMode}
          autoCapitalize={type === 'email' ? 'off' : undefined}
          spellCheck={type === 'email' ? false : undefined}
          defaultValue={defaultValue}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errId : undefined}
          className={cls}
        />
      )}
      <div className="mt-1.5 flex items-start justify-between gap-3">
        {error ? (
          <p id={errId} className="text-sm text-rose-400">
            {error}
          </p>
        ) : (
          <span />
        )}
        {hint}
      </div>
    </div>
  )
}

export function ContactForm() {
  const [round, setRound] = useState(0)
  return <ContactFormInner key={round} onReset={() => setRound((r) => r + 1)} />
}

function ContactFormInner({ onReset }: { onReset: () => void }) {
  const formRef = useRef<HTMLFormElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const token = useRef<{ value: string; at: number } | null>(null)
  const tokenRequest = useRef<Promise<{ value: string; at: number } | null> | null>(null)

  // A signed, short-lived token from the server is required to send. It is requested the first time the
  // visitor interacts with the form (not on page load), and refreshed if it is about to expire.
  const ensureToken = () => {
    if (token.current && Date.now() - token.current.at < TOKEN_REFRESH_MS) return Promise.resolve(token.current)
    tokenRequest.current ??= getContactToken()
      .then((value) => (token.current = value ? { value, at: Date.now() } : null))
      .catch(() => null)
      .finally(() => (tokenRequest.current = null))
    return tokenRequest.current
  }

  const submit = async (prev: ContactState, formData: FormData): Promise<ContactState> => {
    const t = await ensureToken()
    if (!t) return { status: 'error', message: 'Too many attempts. Please wait a few minutes and try again.' }
    const wait = TOKEN_MIN_AGE_MS - (Date.now() - t.at)
    if (wait > 0) await sleep(wait)
    formData.set('token', t.value)
    const result = await sendContact(prev, formData)
    if (result.status === 'success' || (result.status === 'error' && result.message.startsWith('Your session expired'))) token.current = null
    return result
  }

  const [state, formAction, pending] = useActionState(submit, initialState)

  const updateCounter = (length: number) => {
    const el = counterRef.current
    if (!el) return
    el.textContent = `${length.toLocaleString('en-US')} / ${LIMITS.message.max.toLocaleString('en-US')}`
    el.classList.toggle('text-amber-400', length > LIMITS.message.max * 0.9)
  }

  // React resets the form after each submission; keep the counter in step with the restored message.
  useEffect(() => {
    const textarea = formRef.current?.elements.namedItem('message') as HTMLTextAreaElement | null
    updateCounter(textarea?.value.length ?? 0)
  }, [state])

  const values = state.status === 'error' ? state.values : undefined
  const errors = state.status === 'error' ? state.fieldErrors : undefined

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {state.status === 'success' ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            role="status"
            className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center"
          >
            <span className="grid size-16 place-items-center rounded-full border border-emerald-400/50 bg-emerald-400/10 text-emerald-300 shadow-[0_0_40px_rgb(52_211_153/0.35)]">
              <CheckIcon size={30} />
            </span>
            <p className="font-display text-2xl font-semibold">Message sent</p>
            <p className="max-w-sm text-muted">{state.message}</p>
            <button type="button" className="btn btn-ghost mt-2" onClick={onReset}>
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            action={formAction}
            onFocusCapture={() => void ensureToken()}
            exit={{ opacity: 0 }}
            noValidate
            className="space-y-5"
            aria-describedby="contact-status"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                name="name"
                label="Name"
                required
                autoComplete="name"
                minLength={LIMITS.name.min}
                maxLength={LIMITS.name.max}
                error={errors?.name}
                defaultValue={values?.name}
              />
              <Field
                name="email"
                label="Email"
                type="email"
                inputMode="email"
                required
                autoComplete="email"
                maxLength={LIMITS.email.max}
                error={errors?.email}
                defaultValue={values?.email}
              />
            </div>
            <Field
              name="company"
              label="Company"
              autoComplete="organization"
              maxLength={LIMITS.company.max}
              error={errors?.company}
              defaultValue={values?.company}
            />
            <Field
              name="message"
              label="Message"
              required
              textarea
              minLength={LIMITS.message.min}
              maxLength={LIMITS.message.max}
              onInput={(e) => updateCounter(e.currentTarget.value.length)}
              error={errors?.message}
              defaultValue={values?.message}
              placeholder="Tell me about the role, team or project…"
              hint={<span ref={counterRef} aria-hidden className="shrink-0 font-mono text-xs text-muted" />}
            />

            {/* Honeypot (hidden from people and assistive tech) */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label>
                Website
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" disabled={pending} className="btn btn-primary relative min-w-44 overflow-hidden disabled:cursor-wait">
                {pending ? (
                  <>
                    <span className="font-mono text-sm tracking-widest">TRANSMITTING</span>
                    <motion.span
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                      animate={{ x: ['-100%', '300%'] }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                    />
                  </>
                ) : (
                  'Send message'
                )}
              </button>
              <p id="contact-status" role="status" aria-live="polite" className={`text-sm ${state.status === 'error' ? 'text-rose-400' : 'text-muted'}`}>
                {state.status === 'error' ? state.message : 'Messages go straight to my inbox.'}
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
