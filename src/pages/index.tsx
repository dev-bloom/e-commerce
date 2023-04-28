import { FC, PropsWithChildren } from "react";
// Components
import ProductList from "@/components/product-list";
import Layout from "@/components/layout/layout";
// Types
import { Product } from "@/types";
// Helpers
import { getProducts } from "@/utils/api/product.helpers";
import {
  PageComponentProps,
  PagePropsWithGlobalStaticProps,
  getGlobalStaticProps,
} from "@/utils/api/api.helpers";

interface HomeStaticProps {
  products: Product[];
}

export async function getStaticProps() {
  const products = await getProducts();

  return getGlobalStaticProps<HomeStaticProps>({ products });
}

type HomeProps = PageComponentProps<HomeStaticProps>;

const Home: HomeProps = ({ products, branding }) => (
  <Layout branding={branding}>
    <ProductList products={products} />
  </Layout>
);

export default Home;
