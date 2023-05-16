import { Button, Result } from "antd";
import { useRouter } from "next/router";

import Layout from "@/components/layout/layout";
import PageHead from "@/components/page-head/page-head";
import {
  PageComponentProps,
  getGlobalStaticProps,
} from "@/utils/api/api.helpers";

import styles from "./404.module.scss";

export async function getStaticProps() {
  return getGlobalStaticProps();
}

type CartProps = PageComponentProps;

const Custom404: CartProps = ({ branding }) => {
  const router = useRouter();
  return (
    <Layout branding={branding}>
      <PageHead branding={branding} title="Página No Encontrada"></PageHead>
      <div className={styles.container}>
        <Result
          status="404"
          title="404"
          subTitle="Lo sentimos, la página que visitaste no existe."
          extra={
            <Button type="primary" onClick={() => router.push("/")}>
              Volver
            </Button>
          }
        />
      </div>
    </Layout>
  );
};

export default Custom404;
