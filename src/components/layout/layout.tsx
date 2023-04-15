import { Layout as ANTDLayout, Input } from "antd";
import styles from "./layout.module.scss";
import { FC } from "react";
import { PropsWithChildren } from "react";
import Link from "next/link";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectTotalProducts } from "@/store/cart";

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  const cartTotal = useSelector(selectTotalProducts);
  console.debug(cartTotal);

  return (
    <ANTDLayout>
      <ANTDLayout.Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          backgroundColor: "white",
        }}
        className={styles.layoutHeader}
      >
        <Link href={`/`}>PISTON WRAPS</Link>
        <Input.Search placeholder="input search text" style={{ width: 200 }} />
        <Link href="/cart">
          <ShoppingCartOutlined className={styles.icons} /> {cartTotal}
        </Link>
      </ANTDLayout.Header>
      <ANTDLayout.Content
        className={styles.layoutBody}
        style={{ padding: "0 50px" }}
      >
        <div style={{ padding: 24, minHeight: 380 }}>{children}</div>
      </ANTDLayout.Content>
      <ANTDLayout.Footer style={{ textAlign: "center" }}>
        Piston Wraps ©2023
      </ANTDLayout.Footer>
    </ANTDLayout>
  );
};

export default Layout;
