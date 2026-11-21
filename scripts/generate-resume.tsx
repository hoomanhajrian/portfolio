/**
 * Builds public/resume.pdf from src/data/profile.ts and src/data/projects.ts.
 * Usage: yarn resume
 *
 * Privacy rule: the resume never includes a phone number or any location.
 * ATS-friendly: single column, real text (standard Helvetica), standard section headings.
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Document, Link, Page, StyleSheet, Text, View, renderToFile } from '@react-pdf/renderer'
import { certifications, earlierExperience, education, experience, profile, skillGroups } from '../src/data/profile'
import { formatPeriod, getProject, type Project } from '../src/data/projects'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = path.join(root, 'public', 'resume.pdf')

const ACCENT = '#0e7490'
const INK = '#111827'
const MUTED = '#4b5563'
const LINE = '#d1d5db'

const s = StyleSheet.create({
  page: { paddingTop: 40, paddingBottom: 48, paddingHorizontal: 46, fontFamily: 'Helvetica', fontSize: 9.6, color: INK, lineHeight: 1.38 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 24, lineHeight: 1.25 },
  headline: { fontSize: 11.5, color: ACCENT, marginTop: 2 },
  contact: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 7, fontSize: 9.2, color: MUTED },
  link: { color: MUTED, textDecoration: 'none' },
  sep: { marginHorizontal: 5, color: LINE },
  section: { marginTop: 13 },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 10.5, color: ACCENT, textTransform: 'uppercase', paddingBottom: 3, borderBottomWidth: 0.8, borderBottomColor: LINE, marginBottom: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  role: { fontFamily: 'Helvetica-Bold', fontSize: 10.4 },
  company: { color: MUTED },
  dates: { fontSize: 9, color: MUTED },
  job: { marginBottom: 8 },
  bulletRow: { flexDirection: 'row', marginTop: 2, paddingRight: 6 },
  bullet: { width: 10, color: ACCENT },
  bulletText: { flex: 1 },
  skillRow: { flexDirection: 'row', marginBottom: 2.5 },
  skillLabel: { width: 92, fontFamily: 'Helvetica-Bold' },
  skillText: { flex: 1 },
  italic: { fontFamily: 'Helvetica-Oblique', color: MUTED, marginTop: 2 },
  footer: { position: 'absolute', bottom: 22, left: 46, right: 46, flexDirection: 'row', justifyContent: 'space-between', fontSize: 8, color: '#9ca3af' },
})

const strip = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

function Bullet({ children }: { children: string }) {
  return (
    <View style={s.bulletRow} wrap={false}>
      <Text style={s.bullet}>•</Text>
      <Text style={s.bulletText}>{children}</Text>
    </View>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={s.section}>
      <Text style={s.h2} minPresenceAhead={40}>
        {title}
      </Text>
      {children}
    </View>
  )
}

// Projects worth a line on the resume (Threeprinted is already covered under Experience).
const selected = ['speedo360', 'sun-tag-and-title', 'gojunk4moving', 'pacivil', 'hesab-ketab']
  .map((slug) => getProject(slug))
  .filter((p): p is Project => Boolean(p))

function Resume() {
  const contact = [
    { label: profile.email, href: `mailto:${profile.email}` },
    { label: strip(profile.links.linkedin), href: profile.links.linkedin },
    { label: strip(profile.links.github), href: profile.links.github },
    { label: strip(profile.links.site), href: profile.links.site },
  ]
  return (
    <Document title={`${profile.name} — Resume`} author={profile.name} subject={`${profile.headline} resume`} keywords={profile.tagline} creator={profile.name} producer={profile.name}>
      <Page size="LETTER" style={s.page}>
        <View>
          <Text style={s.name}>{profile.name}</Text>
          <Text style={s.headline}>
            {profile.headline} | {profile.tagline.replace(/ · /g, ', ')}
          </Text>
          <View style={s.contact}>
            {contact.map((c, i) => (
              <View key={c.href} style={{ flexDirection: 'row' }}>
                {i > 0 && <Text style={s.sep}>|</Text>}
                <Link src={c.href} style={s.link}>
                  {c.label}
                </Link>
              </View>
            ))}
          </View>
        </View>

        <Section title="Summary">
          <Text>{profile.summary}</Text>
        </Section>

        <Section title="Skills">
          {skillGroups.map((g) => (
            <View key={g.title} style={s.skillRow} wrap={false}>
              <Text style={s.skillLabel}>{g.title}</Text>
              <Text style={s.skillText}>{g.skills.join(', ')}</Text>
            </View>
          ))}
        </Section>

        <Section title="Experience">
          {experience.map((job) => (
            <View key={job.company + job.role} style={s.job}>
              <View style={s.row} wrap={false} minPresenceAhead={30}>
                <Text>
                  <Text style={s.role}>{job.role}</Text>
                  <Text style={s.company}> | {job.company}</Text>
                </Text>
                <Text style={s.dates}>
                  {job.start} – {job.end}
                </Text>
              </View>
              {job.summary && <Text style={s.italic}>{job.summary}</Text>}
              {job.bullets.map((b) => (
                <Bullet key={b}>{b}</Bullet>
              ))}
            </View>
          ))}
          <Text style={{ color: MUTED, fontSize: 9 }}>
            Earlier: {earlierExperience.map((e) => `${e.role}, ${e.company} (${e.start} – ${e.end})`).join('; ')}.
          </Text>
        </Section>

        <Section title="Selected Projects">
          {selected.map((p) => (
            <View key={p.slug} style={{ marginBottom: 4 }} wrap={false}>
              <View style={s.row}>
                <Text>
                  <Text style={s.role}>{p.name}</Text>
                  {p.links.live ? (
                    <Link src={p.links.live} style={{ ...s.link, fontSize: 9 }}>
                      {`  ${strip(p.links.live)}`}
                    </Link>
                  ) : null}
                </Text>
                <Text style={s.dates}>{formatPeriod(p.period)}</Text>
              </View>
              <Text>
                {p.summary} <Text style={{ color: MUTED }}>({p.stack.slice(0, 4).join(', ')})</Text>
              </Text>
            </View>
          ))}
          <Text style={{ color: MUTED, fontSize: 9, marginTop: 2 }}>
            All projects with details: <Link src={`${profile.links.site}/projects`} style={s.link}>{`${strip(profile.links.site)}/projects`}</Link>
          </Text>
        </Section>

        <Section title="Education">
          {education.map((e) => (
            <View key={e.credential} style={[s.row, { marginBottom: 3 }]} wrap={false}>
              <Text>
                <Text style={s.role}>{e.credential}</Text>
                <Text style={s.company}> | {e.school}</Text>
              </Text>
              <Text style={s.dates}>
                {e.start} – {e.end}
              </Text>
            </View>
          ))}
        </Section>

        <Section title="Certifications">
          {certifications.map((c) => (
            <Bullet key={c.name}>{`${c.name} (${c.issuer})${c.note && c.issuer === 'LinkedIn Learning' ? `: ${c.note}` : ''}`}</Bullet>
          ))}
        </Section>

        <Section title="Languages">
          <Text>{profile.languages.join(', ')}</Text>
        </Section>

        <View style={s.footer} fixed>
          <Text>{profile.name} | Resume</Text>
          <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>
    </Document>
  )
}

await renderToFile(<Resume />, out)
console.log(`Wrote ${path.relative(root, out)}`)
