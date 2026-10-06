'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { dataset, projectId } from './sanity/env';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'planex-interior',
  title: 'Планекс Интериор',
  projectId: projectId || 'placeholder',
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: S => S.list().title('Съдържание').items([
        S.documentTypeListItem('portfolioProject').title('Портфолио'),
      ]),
    }),
  ],
  schema: { types: schemaTypes },
});
