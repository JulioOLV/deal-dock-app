import { makeGetProductDetailUseCase } from "@/main/factories/usecases/get-product-detail-factory";
import { Navbar, ProductDetail } from "../../components";
import { cache } from "react";
import { ProductAPIDetailResponse } from "@/domain/models/product-detail-model";

interface PageProps {
  params: Promise<{ productId: string }>
}

export default async function ProductDetailPage({
  params,
}: PageProps) {
  const { productId } = await params;

  const getProductDetailUseCase = makeGetProductDetailUseCase(productId);

  const getProductDetail = cache(
    async (): Promise<ProductAPIDetailResponse> => {
      try {
        const httpResponse = await getProductDetailUseCase.getProductDetail();
  
        return httpResponse;
      } catch (err: any) {
        throw err;
      }
    }
  );

  const product = await getProductDetail();

  return (
    <>
      <Navbar />
      <main>
        <ProductDetail product={product} />
      </main>
    </>
  );
};
