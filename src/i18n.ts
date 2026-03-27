import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "pt-BR": {
    translation: {
      nav: {
        home: "Início",
        about: "Quem Somos",
        projects: "Projetos",
        news: "Notícias",
        gallery: "Galeria",
        transparency: "Transparência",
        volunteer: "Voluntariado",
        partners: "Parceiros",
        donations: "Doações",
        contact: "Contato",
        donateNow: "Doe Agora",
      },
      a11y: {
        skipToContent: "Ir para o conteúdo",
      },
      cookies: {
        title: "Privacidade",
        message:
          "Usamos cookies para medir o tráfego e melhorar o site. Você pode aceitar ou recusar o uso de analytics.",
        accept: "Aceitar",
        decline: "Recusar",
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        projects: "Projects",
        news: "News",
        gallery: "Gallery",
        transparency: "Transparency",
        volunteer: "Volunteering",
        partners: "Partners",
        donations: "Donations",
        contact: "Contact",
        donateNow: "Donate now",
      },
      a11y: {
        skipToContent: "Skip to content",
      },
      cookies: {
        title: "Privacy",
        message: "We use cookies to measure traffic and improve the site. You can accept or decline analytics.",
        accept: "Accept",
        decline: "Decline",
      },
    },
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: "pt-BR",
  fallbackLng: "pt-BR",
  interpolation: { escapeValue: false },
});

export default i18n;
