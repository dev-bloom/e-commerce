import React, { PropsWithChildren } from "react";
import { Product } from "../api/products";

export async function getStaticPaths() {
  const productsResponse = await fetch("http://localhost:3000/api/products");
  const formattedProducts = await productsResponse.json();
  const paths = formattedProducts.map((product: Product) => ({
    params: { productId: product.slug },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;
  const product = await fetch(
    "http://localhost:3000/api/product?" +
      new URLSearchParams({ slug: productId })
  );
  const formattedProduct = await product.json();
  return {
    props: {
      product: formattedProduct,
    },
  };
}

const ProductId = ({ product }: PropsWithChildren<{ product: Product }>) => {
  console.debug(product);
  return <div>{product.name}</div>;
};

export default ProductId;
