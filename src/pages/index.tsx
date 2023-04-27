import ProductList from "@/components/product-list";
import Layout from "@/components/layout/layout";

import { FC, PropsWithChildren } from "react";
import { Product } from "./api/products";
import { getProducts } from "@/utils/api/product.helpers";

export async function getStaticProps() {
  const products = await getProducts();

  return {
    props: {
      products,
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
