// Components
import ProductList from "@/components/product-list";
import Layout from "@/components/layout/layout";
// Types
import { Product } from "@/types";
// Helpers
import { getProducts } from "@/utils/api/product.helpers";
import {
  PageComponentProps,
  getGlobalServerSideProps,
  getGlobalStaticProps,
} from "@/utils/api/api.helpers";
import PageHead from "@/components/page-head/page-head";
import { GetServerSidePropsContext } from "next";
import { Button, Result } from "antd";
import { useRouter } from "next/router";

interface ProductListPageServerProps {
  products: Product[];
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    query: { query, page },
  } = context;
  const parsedQuery = query
    ? Array.isArray(query)
      ? query[0]
      : query
    : undefined;
  const parsedPage = page
    ? Number(Array.isArray(page) ? page[0] : page)
    : undefined;
  const products = await getProducts({ query: parsedQuery, page: parsedPage });

  return getGlobalServerSideProps<ProductListPageServerProps>({ products });
}

type HomeProps = PageComponentProps<ProductListPageServerProps>;

const ProductListPage: HomeProps = ({ products, branding }) => {
  const router = useRouter();
  return (
    <Layout branding={branding}>
      <PageHead branding={branding} title="Product List" />
      {products.length === 0 && (
        <Result
          status="404"
          title="404"
          subTitle="No se encontraron productos."
          extra={
            <Button type="primary" onClick={() => router.push("/")}>
              Volver
            </Button>
          }
        />
      )}

      <ProductList products={products} />
    </Layout>
  );
};

export default ProductListPage;
