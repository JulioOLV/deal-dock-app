import { ProductDetailPage } from "@/ui/pages/product-detail/product-detail";
import { makeGetProductDetailUseCase } from "../usecases/get-product-detail-factory";
import { authProvider } from "@/infra/store/auth-provider";

interface PageProps {
  params: Promise<{ productId: string }>;
}

export const makeProductDetailPage = async (context: PageProps) => {
  const { productId } = await context.params;
  const token = await authProvider();

  const getProductDetailUseCase = makeGetProductDetailUseCase(
    productId,
    token,
  );

  return <ProductDetailPage getProductDetailUseCase={getProductDetailUseCase} />;
};
