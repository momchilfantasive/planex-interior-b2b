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

The current content is intentionally kept in local data structures in `app/page.tsx`. This keeps the project independent of a CMS until the content model is approved. The service, project, process and contact data can later be moved to a headless CMS without changing the visual components.

## Deployment

The repository is intended to be connected to Vercel through Git integration:

- pushes to `main` update production;
- feature branches and pull requests receive preview URLs;
- no runtime environment variables are currently required.
