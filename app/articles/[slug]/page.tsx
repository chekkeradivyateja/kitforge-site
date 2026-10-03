import type { Metadata } from "next";
import { getSlugs, getArticle } from "@/lib/articles";
import { site } from "@/lib/site";
import Cta from "@/components/Cta";

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  return {
    title: a.title,
    description: a.description,
    keywords: a.keywords,
    alternates: { canonical: `${site.url}/articles/${slug}/` },
    openGraph: { title: a.title, description: a.description, type: "article" },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  return (
    <article className="prose">
      <h1>{a.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: a.html }} />
      <Cta
        campaign={slug}
        product={a.product}
        productName={a.productName}
        productUrl={a.productUrl}
        productPrice={a.productPrice}
      />
    </article>
  );
}
