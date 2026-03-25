export type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  objectives: string[];
  area: string;
  city: string;
  startDate: string;
  endDate: string;
  status: string;
  beneficiaries: string;
  featured: boolean;
  image: string;
};

export type NewsItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
};

export type Partner = {
  id: string;
  name: string;
  category: string;
  description: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
};

export type TransparencyDoc = {
  id: string;
  title: string;
  category: string;
  date: string;
  type: string;
};

export type ImpactNumber = {
  label: string;
  value: number;
};

export type GalleryImage = {
  id: string;
  url: string;
  caption: string;
  album: string;
};

export type SiteContent = {
  projects: Project[];
  news: NewsItem[];
  partners: Partner[];
  testimonials: Testimonial[];
  transparencyDocs: TransparencyDoc[];
  impactNumbers: ImpactNumber[];
  galleryImages: GalleryImage[];
};
