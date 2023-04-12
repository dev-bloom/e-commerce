import { Layout, Input } from "antd";
import styles from "./layout.module.scss";

const { Search } = Input;

const { Header, Content, Footer } = Layout;

export default function Container({ children }: any) {
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          backgroundColor: "white",
        }}
        className={styles.layoutHeader}
      >
        Piston Wraps
        <Search placeholder="Buscar productos" style={{ width: 200 }} />
      </Header>
      <Content className="site-layout" style={{ padding: "0 50px" }}>
        <div style={{ padding: 24, minHeight: 380 }}>{children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
}
