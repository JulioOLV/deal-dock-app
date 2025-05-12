import { ProductDetailPage } from "@/ui/pages/product-detail/product-detail";
import { makeGetProductDetailUseCase } from "../usecases/get-product-detail-factory";
import { makeRefreshTokenUseCase } from "../usecases/refresh-token-factory";

interface PageProps {
  params: Promise<{ productId: string }>;
}

export const makeProductDetailPage = async (context: PageProps) => {
  const { productId } = await context.params;

  // Use expires_in to check if the token is expired
  const refreshTokenUseCase = makeRefreshTokenUseCase();
  const token = await refreshTokenUseCase.getToken();

  const getProductDetailUseCase = makeGetProductDetailUseCase(
    productId,
    token.access_token
  );

  return <ProductDetailPage getProductDetailUseCase={getProductDetailUseCase} />;
};
