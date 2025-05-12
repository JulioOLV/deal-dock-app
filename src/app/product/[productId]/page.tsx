import { makeProductDetailPage } from "@/main/factories/pages/product-detail";

interface PageProps {
  params: Promise<{ productId: string }>
}

export default async function ProductDetailPage({
  params,
}: PageProps) {
  return makeProductDetailPage({ params });
};
