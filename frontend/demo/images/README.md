# Demo Destination Images

Place real destination photos here using the filename format: `<slug>.jpg` or `<slug>.webp`

Then update the `image` field in `demo/destinations.ts` to point to `/images/locations/<slug>.jpg`.

## Required filenames (one per destination)

| Slug | Filename | Status |
|---|---|---|
| kandy | kandy.jpg | needs image |
| trincomalee | trincomalee.jpg | needs image |
| dambulla | dambulla.jpg | needs image |
| yala | yala.jpg | needs image |
| adams-peak | adams-peak.jpg | needs image |
| ambuluwawa | ambuluwawa.jpg | needs image |
| mirissa | mirissa.jpg | needs image |
| galle | galle.jpg | needs image |
| sinharaja | sinharaja.jpg | needs image |
| polonnaruwa | polonnaruwa.jpg | needs image |
| nuwara-eliya | nuwara-eliya.jpg | needs image |
| sigiriya | sigiriya.jpg | needs image |
| wilpattu | wilpattu.jpg | needs image |
| hikkaduwa | hikkaduwa.jpg | needs image |
| arugam-bay | arugam-bay.jpg | needs image |
| anuradhapura | anuradhapura.jpg | needs image |
| ella | ella.jpg | needs image |
| jaffna | jaffna.jpg | ✅ exists at /public/images/locations/jaffna.jpg |

## Where images should live

Copy finished files to:
```
frontend/public/images/locations/<slug>.jpg
```

The `demo/images/` folder is just a staging area. Next.js serves static files from `public/` only.

## Image specifications
- Minimum size: 800×600 px
- Recommended: 1200×800 px, landscape orientation
- Format: .jpg or .webp (webp preferred for smaller file size)
- Rename to match the slug exactly (lowercase, hyphens, no spaces)
