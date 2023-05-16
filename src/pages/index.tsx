// Components
import Hero from "@/components/hero/hero";
import Layout from "@/components/layout/layout";
import PageHead from "@/components/page-head/page-head";
import ProductList from "@/components/product-list";
// Types
import { FeaturedProducts, Product } from "@/types";
// Helpers
import {
  PageComponentProps,
  getGlobalStaticProps,
} from "@/utils/api/api.helpers";
import { getFeaturedProducts, getProducts } from "@/utils/api/product.helpers";

interface ProductListPageStaticProps {
  products: Product[];
  featuredProducts: FeaturedProducts | null;
}

export async function getStaticProps() {
  const [products, featuredProducts] = await Promise.all([
    getProducts(),
    getFeaturedProducts(),
  ]);

  return getGlobalStaticProps<ProductListPageStaticProps>({
    products,
    featuredProducts: featuredProducts,
  });
}

type HomeProps = PageComponentProps<ProductListPageStaticProps>;

const ProductListPage: HomeProps = ({
  products,
  branding,
  featuredProducts,
}) => (
  <>
    <Layout
      branding={branding}
      top={<Hero featuredProducts={featuredProducts} />}
    >
      <PageHead branding={branding} title="Home" />
      <ProductList products={products} />
    </Layout>
  </>
);

export default ProductListPage;
