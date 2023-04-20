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

  return (
    <ANTDLayout>
      <ANTDLayout.Header className={styles.layoutHeader}>
        <Link href={`/`}>PISTON WRAPS</Link>
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
