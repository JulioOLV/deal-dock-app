import { Navbar, ProductDetail } from "../../components";

interface PageProps {
  params: Promise<{ productId: string }>
}

export default async function ProductDetailPage({
  params,
}: PageProps) {
  const { productId } = await params;

  return (
    <>
      <Navbar />
      <main>
        <ProductDetail productId={productId} />
      </main>
    </>
  );
};
