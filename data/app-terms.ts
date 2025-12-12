export type TermType = 'terms_of_service' | 'privacy_policy' | 'cookie_policy' | 'eula';

export interface AppTerm {
  id: string;
  type: TermType;
  version: string;
  title: string;
  content: string; // Markdown or HTML string
  summary: string; // AI generated summary placeholder
  createdAt: string; // ISO Date (Replacing effectiveDate)
  updatedAt: string; // ISO Date
  flags: AppTermFlags;
  changelog?: string;
}

export enum AppTermFlags {
  None = 0,
  IsActive = 1 << 0,
}

export const APP_TERMS: AppTerm[] = [
  {
    id: 'term_tos_v1.0',
    type: 'terms_of_service',
    version: '1.0.0',
    title: 'Terms of Service',
    content: '# Terms of Service\n\n1. Introduction...\n2. Acceptable Use...',
    summary: 'Initial release of terms.',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    flags: AppTermFlags.None
  },
  {
    id: 'term_tos_v1.1',
    type: 'terms_of_service',
    version: '1.1.0',
    title: 'Terms of Service',
    content: '# Terms of Service\n\n1. Introduction...\n2. Acceptable Use...\n3. AI Usage...',
    summary: 'Updated to include AI usage guidelines.',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    flags: AppTermFlags.IsActive,
    changelog: 'Added section 3 regarding generative AI outputs.'
  },
  {
    id: 'term_privacy_v1.0',
    type: 'privacy_policy',
    version: '1.0.0',
    title: 'Privacy Policy',
    content: '# Privacy Policy\n\nWe collect minimal data...',
    summary: 'Standard privacy policy.',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    flags: AppTermFlags.IsActive
  }
];