# Planex Interior

Marketing website for Planex Interior, built with Next.js App Router and prepared for deployment on Vercel.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run lint
npm run build
```

## Project structure

- `app/page.tsx` contains the homepage content and sections.
- `app/globals.css` contains the design system and responsive styles.
- `public/images` contains project and service imagery.
- `public/videos` contains the hero video.
- `public/fonts` contains the self-hosted Cyrillic and Latin font subsets.

## CMS integration

Sanity is connected only to the Portfolio page. All other pages stay static.

- Editors add and publish projects in Studio at `/studio/`.
- Published projects appear on `/portfolio/`, sorted by the `Подредба` field.
- Each project uses: име, категория, локация, основна снимка, останали снимки, alt описание and подредба.
- Opening a project shows a carousel of that project's photos only. The cover image is the main image; additional photos come from the gallery field.
- Until existing projects are migrated into Sanity, the current local list remains as fallback content. Newly published CMS projects are shown first; a fallback item is hidden only after a CMS project with the same name and location is published.

Copy `.env.example` to `.env.local` and fill in the Sanity project values. The env file also documents Vercel variables, the optional revalidate webhook, and required CORS origins.

## Deployment

The repository is intended to be connected to Vercel through Git integration:

- pushes to `main` update production;
- feature branches and pull requests receive preview URLs;
- add the Sanity variables from `.env.example` in Vercel → Project Settings → Environment Variables for Production, Preview and Development;
- after the first production deploy, add that origin in Sanity Manage → API → CORS origins with credentials allowed;
- optionally create a Sanity webhook to `https://YOUR-DOMAIN/api/revalidate` so portfolio changes publish immediately. Without it, `/portfolio/` refreshes at least every 60 seconds.
