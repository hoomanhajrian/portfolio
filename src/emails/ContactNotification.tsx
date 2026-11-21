import { Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text } from 'react-email'

export type ContactNotificationProps = {
  name: string
  email: string
  company?: string
  message: string
  sentAt: string
  siteUrl: string
}

const colors = {
  bg: '#05070d',
  panel: '#0b1222',
  line: '#1c2740',
  fg: '#e6edf7',
  muted: '#93a1b8',
  accent: '#22d3ee',
  accent2: '#a78bfa',
}

/** Email sent to Hooman when someone submits the portfolio contact form. */
export default function ContactNotification({ name, email, company, message, sentAt, siteUrl }: ContactNotificationProps) {
  const firstLine = message.split('\n')[0].slice(0, 90)
  return (
    <Html lang="en">
      <Head />
      <Preview>{`New message from ${name}${company ? ` (${company})` : ''}: ${firstLine}`}</Preview>
      <Body style={{ backgroundColor: colors.bg, margin: 0, padding: '32px 12px', fontFamily: 'Inter, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>
        <Container style={{ maxWidth: 600, margin: '0 auto', backgroundColor: colors.panel, border: `1px solid ${colors.line}`, borderRadius: 16, overflow: 'hidden' }}>
          <Section style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})`, height: 4 }} />
          <Section style={{ padding: '28px 32px 8px' }}>
            <Text style={{ margin: 0, color: colors.accent, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, Menlo, monospace' }}>
              Portfolio · New contact message
            </Text>
            <Heading as="h1" style={{ margin: '10px 0 0', color: colors.fg, fontSize: 24, lineHeight: '32px' }}>
              {name} wants to get in touch
            </Heading>
          </Section>

          <Section style={{ padding: '8px 32px' }}>
            <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={{ borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  ['Name', name],
                  ['Email', email],
                  ['Company', company || '—'],
                  ['Sent', sentAt],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td style={{ padding: '8px 0', width: 96, color: colors.muted, fontSize: 13, verticalAlign: 'top' }}>{label}</td>
                    <td style={{ padding: '8px 0', color: colors.fg, fontSize: 14 }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section style={{ padding: '8px 32px' }}>
            <Hr style={{ border: 'none', borderTop: `1px solid ${colors.line}`, margin: 0, width: '100%' }} />
          </Section>

          <Section style={{ padding: '8px 32px 0' }}>
            <Text style={{ margin: '0 0 8px', color: colors.muted, fontSize: 13 }}>Message</Text>
            <Text style={{ margin: 0, color: colors.fg, fontSize: 15, lineHeight: '24px', whiteSpace: 'pre-wrap' }}>{message}</Text>
          </Section>

          <Section style={{ padding: '28px 32px 32px' }}>
            <Button
              href={`mailto:${email}?subject=${encodeURIComponent('Re: your message on my portfolio')}`}
              style={{ backgroundColor: colors.accent, color: '#03141a', fontWeight: 600, fontSize: 14, padding: '12px 20px', borderRadius: 10 }}
            >
              Reply to {name.split(' ')[0]}
            </Button>
          </Section>

          <Section style={{ borderTop: `1px solid ${colors.line}`, padding: '16px 32px' }}>
            <Text style={{ margin: 0, color: colors.muted, fontSize: 12 }}>
              Sent from the contact form on {siteUrl.replace(/^https?:\/\//, '')}. Replying to this email goes straight to the sender.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

ContactNotification.PreviewProps = {
  name: 'Jordan Recruiter',
  email: 'jordan@example.com',
  company: 'Acme Corp',
  message: 'Hi Hooman,\n\nI came across your portfolio and would love to chat about a Full Stack Developer role on our team.\n\nAre you free for a quick call this week?',
  sentAt: 'Sat, 21 Nov 2026, 10:30 UTC',
  siteUrl: 'https://hoomanhajarian.com',
} satisfies ContactNotificationProps
