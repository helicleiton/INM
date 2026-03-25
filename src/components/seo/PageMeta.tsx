import { Helmet } from "react-helmet-async";

const DEFAULT_SITE = "Instituto Novo Milênio";

type PageMetaProps = {
  title: string;
  description?: string;
};

export function PageMeta({ title, description }: PageMetaProps) {
  const fullTitle = title.includes("Instituto Novo") ? title : `${title} | ${DEFAULT_SITE}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description ? <meta name="description" content={description} /> : null}
      <meta property="og:title" content={fullTitle} />
      {description ? <meta property="og:description" content={description} /> : null}
    </Helmet>
  );
}
