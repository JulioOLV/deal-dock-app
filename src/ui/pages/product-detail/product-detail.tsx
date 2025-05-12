import React, { cache } from "react";

import { ProductAPIDetailResponse } from "@/domain/models";
import { Navbar, ProductDetail } from "@/ui/components";
import { GetProductDetail } from "@/data/usecases/product/get-product-detail";

interface PageProps {
  getProductDetailUseCase: GetProductDetail;
}

export async function ProductDetailPage({ getProductDetailUseCase }: PageProps) {
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
}
