export interface IGenericMedia {
    id: number | string;
    url: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
    };
    mime?: string;
}

export interface IGenericSeo {
  title: string
  description: string
  keywords?: string[]
  canonicalUrl?: string
  robots?: string
  og?: {
      title?: string
      description?: string
      image?: IGenericMedia
      type?: 'website' | 'article' | 'profile'
      locale?: string
  }
  twitter?: {
      card?: 'summary' | 'summary_large_image'
      site?: string // e.g. @opendnd
      creator?: string
  }
  structuredData?: Record<string, any>
}