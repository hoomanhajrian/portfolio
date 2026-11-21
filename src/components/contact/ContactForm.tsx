'use client'

import { useActionState, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { sendContact } from '@/app/actions/contact'
import type { ContactState } from '@/lib/contact-schema'
import { CheckIcon } from '@/components/site/icons'

const initialState: ContactState = { status: 'idle' }

type FieldName = 'name' | 'email' | 'company' | 'message'

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
}: {
  name: FieldName
  label: string
  type?: string
  required?: boolean
  autoComplete?: string
  textarea?: boolean
  error?: string
  defaultValue?: string
  placeholder?: string
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
          maxLength={5000}
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
          defaultValue={defaultValue}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errId : undefined}
          className={cls}
        />
      )}
      {error && (
        <p id={errId} className="mt-1.5 text-sm text-rose-400">
          {error}
        </p>
      )}
    </div>
  )
}

export function ContactForm() {
  const [round, setRound] = useState(0)
  return <ContactFormInner key={round} onReset={() => setRound((r) => r + 1)} />
}

function ContactFormInner({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(sendContact, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const startedAtRef = useRef<HTMLInputElement>(null)

  const startedAt = useRef(0)

  // When the form first appeared (used server-side to reject instant bot submissions). React resets the
  // form after every submission, so the same original timestamp is written back after each response.
  useEffect(() => {
    if (!startedAt.current) startedAt.current = Date.now()
    if (startedAtRef.current) startedAtRef.current.value = String(startedAt.current)
  }, [state])

  useEffect(() => {
    if (state.status === 'success') formRef.current?.reset()
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
          <motion.form key="form" ref={formRef} action={formAction} exit={{ opacity: 0 }} noValidate className="space-y-5" aria-describedby="contact-status">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field name="name" label="Name" required autoComplete="name" error={errors?.name} defaultValue={values?.name} />
              <Field name="email" label="Email" type="email" required autoComplete="email" error={errors?.email} defaultValue={values?.email} />
            </div>
            <Field name="company" label="Company" autoComplete="organization" error={errors?.company} defaultValue={values?.company} />
            <Field
              name="message"
              label="Message"
              required
              textarea
              error={errors?.message}
              defaultValue={values?.message}
              placeholder="Tell me about the role, team or project…"
            />

            {/* Honeypot (hidden from people and assistive tech) */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label>
                Website
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="" />

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
