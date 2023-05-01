import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import PageHead from "@/components/page-head/page-head";
import Layout from "@/components/layout/layout";
import Loading from "@/components/loading/loading";
import ProductInfo from "@/components/page-components/detail-screen/product-info/product-info";

import { Product } from "@/types";

import { getProduct, getProducts } from "@/utils/api/product.helpers";
import {
  PageComponentProps,
  getGlobalStaticProps,
} from "@/utils/api/api.helpers";

import {
  addItem,
  removeItem,
  selectIsProductInCart,
  selectProductCountForSlug,
} from "@/store/cart";

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
  product?: Product;
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
  const dispatch = useDispatch();

  const productCount = useSelector(
    selectProductCountForSlug(product?.fields.slug ?? "")
  );
  const isProductInCart = useSelector(
    selectIsProductInCart(product?.fields.slug ?? "")
  );

  const onRemoveFromCart = () => {
    dispatch(removeItem(product?.fields.slug ?? ""));
  };

  const onAddToCart = (quantity: number) => {
    if (!product) return;
    dispatch(
      addItem({
        product,
        quantity,
      })
    );
  };

  if (router.isFallback || !product) {
    return <Loading />;
  }
  return (
    <Layout branding={branding}>
      <PageHead branding={branding} title={product.fields.name} />
      <ProductInfo
        product={product}
        productCount={productCount}
        isProductInCart={isProductInCart}
        onAddToCart={onAddToCart}
        onRemoveFromCart={onRemoveFromCart}
      />
    </Layout>
  );
};

export default ProductId;
