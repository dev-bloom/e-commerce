// Components
import ProductList from "@/components/product-list";
import Layout from "@/components/layout/layout";
// Types
import { Product } from "@/types";
// Helpers
import { getProducts } from "@/utils/api/product.helpers";
import {
  PageComponentProps,
  getGlobalStaticProps,
} from "@/utils/api/api.helpers";
import PageHead from "@/components/page-head/page-head";
import Hero from "@/components/hero/hero";

interface ProductListPageStaticProps {
  products: Product[];
}

export async function getStaticProps() {
  const products = await getProducts();

  return getGlobalStaticProps<ProductListPageStaticProps>({ products });
}

type HomeProps = PageComponentProps<ProductListPageStaticProps>;

const ProductListPage: HomeProps = ({ products, branding }) => (
  <>
    <Layout branding={branding} top={<Hero product={products[0]} />}>
      <PageHead branding={branding} title="Home" />
      <ProductList products={products} />
    </Layout>
  </>
);

export default ProductListPage;
