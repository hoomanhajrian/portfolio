// Checks every project live/code link and reports the HTTP status.
// Usage: yarn check-links
import { projects } from '../src/data/projects'

const results = await Promise.all(
  projects.flatMap((p) =>
    Object.entries(p.links).map(async ([kind, url]) => {
      try {
        const res = await fetch(url!, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15000) })
        return { project: p.slug, kind, url, status: res.status }
      } catch (err) {
        return { project: p.slug, kind, url, status: `ERR ${(err as Error).name}` }
      }
    }),
  ),
)

for (const r of results) {
  const ok = typeof r.status === 'number' && r.status < 400
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${String(r.status).padEnd(10)} ${r.project.padEnd(20)} ${r.kind.padEnd(5)} ${r.url}`)
}
const failed = results.filter((r) => !(typeof r.status === 'number' && r.status < 400))
if (failed.length) process.exitCode = 1
