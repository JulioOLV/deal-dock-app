import { Navbar } from "../components";

interface PageProps {
  params: Promise<{ productId: string }>
}

export default async function ProductDetail({
  params,
}: PageProps) {
  const { productId } = await params;

  return (
    <>
      <Navbar />
      <main>
        <h1>Product Detail - {productId}</h1>
        <p>Details about the product will be displayed here.</p>
      </main>
    </>
  );
};
