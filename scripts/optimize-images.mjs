// Re-encodes the source screenshots in assets/images into web-ready WebP files:
//   public/img/projects/<slug>-<hash>.webp      (max 1600px wide, used by next/image)
//   public/img/projects/3d/<slug>-<hash>.webp   (max 1024px, used as 3D hallway textures)
// The content hash in the file name busts browser/CDN/image-optimizer caches whenever a screenshot changes.
//   public/img/me.webp                   (profile photo)
// Re-encoding strips EXIF/GPS metadata and fixes PNGs saved with a .jpg name.
// It also writes src/data/images.generated.json with the real dimensions.
//
// Usage: yarn images
import fs from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = path.join(root, 'assets', 'images')
const outDir = path.join(root, 'public', 'img', 'projects')
const out3dDir = path.join(outDir, '3d')
const manifestPath = path.join(root, 'src', 'data', 'images.generated.json')

await fs.mkdir(out3dDir, { recursive: true })

// Start clean so renamed/removed screenshots don't leave stale files behind.
for (const dir of [outDir, out3dDir]) {
  for (const f of await fs.readdir(dir)) if (f.endsWith('.webp')) await fs.unlink(path.join(dir, f))
}

async function writeHashed(pipeline, dir, slug) {
  const { data, info } = await pipeline.toBuffer({ resolveWithObject: true })
  const name = `${slug}-${createHash('sha1').update(data).digest('hex').slice(0, 8)}.webp`
  await fs.writeFile(path.join(dir, name), data)
  return { name, width: info.width, height: info.height, size: data.length }
}

const files = (await fs.readdir(srcDir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
const manifest = {}

for (const file of files) {
  const slug = path.basename(file, path.extname(file))
  const input = path.join(srcDir, file)

  if (slug === 'me') {
    const info = await sharp(input).rotate().webp({ quality: 82 }).toFile(path.join(root, 'public', 'img', 'me.webp'))
    manifest[slug] = { src: '/img/me.webp', width: info.width, height: info.height }
    console.log(`me.webp ${info.width}x${info.height}`)
    continue
  }

  const main = await writeHashed(sharp(input).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 78 }), outDir, slug)
  const tex = await writeHashed(
    sharp(input).rotate().resize({ width: 1024, height: 1024, fit: 'inside', withoutEnlargement: true }).webp({ quality: 72 }),
    out3dDir,
    slug,
  )

  manifest[slug] = {
    src: `/img/projects/${main.name}`,
    texture: `/img/projects/3d/${tex.name}`,
    width: main.width,
    height: main.height,
  }
  console.log(`${slug}: ${main.width}x${main.height} (${(main.size / 1024).toFixed(0)} KB), texture ${tex.width}x${tex.height}`)
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)))
await fs.writeFile(manifestPath, JSON.stringify(sorted, null, 2) + '\n')
console.log(`Wrote ${path.relative(root, manifestPath)}`)
