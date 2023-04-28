import { Layout as ANTDLayout } from "antd";
import { FC, useEffect } from "react";
import { PropsWithChildren } from "react";
import Link from "next/link";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectTotalProducts } from "@/store/cart";
import { Branding } from "@/types";
import { getImageURLFromAsset } from "@/utils/helpers";
import Image from "next/image";
import styles from "./layout.module.scss";
import { setColors } from "@/utils/colors";

interface LayoutProps {
  branding: Branding;
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, branding }) => {
  const cartTotal = useSelector(selectTotalProducts);
  const { companyName, logo, primaryColor, secondaryColor, tertiaryColor } =
    branding.fields;
  const logoImage = getImageURLFromAsset(logo);

  useEffect(() => {
    setColors({ primaryColor, secondaryColor, tertiaryColor });
  }, [primaryColor, secondaryColor, tertiaryColor]);

  return (
    <ANTDLayout>
      <ANTDLayout.Header className={styles.layoutHeader}>
        <Link href={`/`} className={styles.branding}>
          <Image
            src={logoImage}
            alt={`${companyName} logo image`}
            width={50}
            height={50}
          />
          {companyName}
        </Link>
        <Link href="/cart" className={styles.cart}>
          <ShoppingCartOutlined className={styles.icons} />
          <span className={styles.cartTotal}>{cartTotal}</span>
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
