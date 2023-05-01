import React from "react";
import { useRouter } from "next/router";

import PageHead from "@/components/page-head/page-head";
import Layout from "@/components/layout/layout";

import { Product } from "@/types";

import { getProduct, getProducts } from "@/utils/api/product.helpers";
import {
  PageComponentProps,
  getGlobalStaticProps,
} from "@/utils/api/api.helpers";
import ProductInfo from "@/components/page-components/detail-screen/product-info/product-info";
import Loading from "@/components/loading/loading";

export async function getStaticPaths() {
  const products = await getProducts();
  const paths = products.map(({ fields: { slug } }: Product) => ({
    params: { productId: slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

interface ProductStaticProps {
  product: Product;
}

export async function getStaticProps({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const product = await getProduct(productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return getGlobalStaticProps<ProductStaticProps>(
    { product },
    { revalidate: 60 }
  );
}

type ProductIdProps = PageComponentProps<ProductStaticProps>;

const ProductId: ProductIdProps = ({ product, branding }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }
  return (
    <Layout branding={branding}>
      <PageHead branding={branding} title={product.fields.name} />
      <ProductInfo product={product} />
    </Layout>
  );
};

export default ProductId;
