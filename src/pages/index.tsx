import ProductList from "@/components/product-list";
import Layout from "@/components/layout/layout";

import { FC, PropsWithChildren, useEffect } from "react";
import { Product } from "./api/products";

export async function getStaticProps() {
  const productsResponse = await fetch("http://localhost:3000/api/products");
  const formattedProducts = await productsResponse.json();
  return {
    props: {
      products: formattedProducts,
    },
  };
}

const Home: FC<PropsWithChildren<{ products: Product[] }>> = ({ products }) => {
  return (
    <Layout>
      <ProductList products={products} />
    </Layout>
  );
};

export default Home;
