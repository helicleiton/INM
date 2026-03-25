/**
 * Compatibilidade: os dados vivem em `content.json` (espelhado em `public/data/content.json`).
 * Preferir `useSiteContent()` nas páginas para refletir atualizações via fetch.
 */
import content from "./content.json";

export const projects = content.projects;
export const news = content.news;
export const partners = content.partners;
export const testimonials = content.testimonials;
export const transparencyDocs = content.transparencyDocs;
export const impactNumbers = content.impactNumbers;
export const galleryImages = content.galleryImages;
