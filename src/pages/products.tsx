// Components
import { Button, Result } from "antd";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import Layout from "@/components/layout/layout";
import PageHead from "@/components/page-head/page-head";
import ProductList from "@/components/product-list";
// Types
import { Product } from "@/types";
// Helpers
import {
  PageComponentProps,
  getGlobalServerSideProps,
} from "@/utils/api/api.helpers";
import { getProducts } from "@/utils/api/product.helpers";
import { parseQuery } from "@/utils/helpers";

interface ProductListPageServerProps {
  products: Product[];
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    query: { query, page },
  } = context;
  const parsedQuery = parseQuery(query);
  const parsedPage = parseQuery(page);
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
