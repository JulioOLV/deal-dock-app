import React, { cache } from "react";

import { makeGetProductDetailUseCase } from "@/main/factories/usecases/get-product-detail-factory";
import { ProductAPIDetailResponse } from "@/domain/models/product-detail-model";
import { Navbar, ProductDetail } from "@/ui/components";
import { makeRefreshTokenUseCase } from "@/main/factories/usecases/refresh-token-factory";

interface PageProps {
  params: Promise<{ productId: string }>
}

export default async function ProductDetailPage({
  params,
}: PageProps) {
  const { productId } = await params;

  // Use expires_in to check if the token is expired
  const refreshTokenUseCase = makeRefreshTokenUseCase();
  const token = await refreshTokenUseCase.getToken();

  const getProductDetailUseCase = makeGetProductDetailUseCase(productId, token.access_token);

  const getProductDetail = cache(
    async (): Promise<ProductAPIDetailResponse> => {
      try {
        const httpResponse = await getProductDetailUseCase.getProductDetail();
  
        return httpResponse;
      } catch (err) {
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
