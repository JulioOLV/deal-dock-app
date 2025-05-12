import { makeCatalogPage } from "@/main/factories/pages/catalog";

interface SearchPageProps {
  searchParams: Promise<any>;
}

export default async function Home({ searchParams }: SearchPageProps) {
  return await makeCatalogPage({ searchParams });
}
