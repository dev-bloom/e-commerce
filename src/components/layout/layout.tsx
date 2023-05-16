import { ShoppingCartOutlined } from "@ant-design/icons";
import { Layout as ANTDLayout } from "antd";
import cn from "classnames";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import type { FC, ReactNode, PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectTotalProducts } from "@/store/cart";
import type { Branding } from "@/types";
import { setColors } from "@/utils/colors";
import { getImageURLFromAsset } from "@/utils/helpers";

import styles from "./layout.module.scss";

interface LayoutProps {
  branding: Branding;
  top?: ReactNode;
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  children,
  branding,
  top,
}) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [hasScrolledBottom, setHasScrolledBottom] = useState(false);
  const cartTotal = useSelector(selectTotalProducts);
  const { companyName, logo, primaryColor, secondaryColor, tertiaryColor } =
    branding.fields;
  const logoImage = getImageURLFromAsset(logo);

  useEffect(() => {
    setColors({ primaryColor, secondaryColor, tertiaryColor });
  }, [primaryColor, secondaryColor, tertiaryColor]);

  useEffect(() => {
    const handleScroll = () => {
      const newHasScrolled = window.scrollY > 0;
      setHasScrolled(newHasScrolled);

      const newHasScrolledBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight;
      setHasScrolledBottom(newHasScrolledBottom);
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ANTDLayout>
      <Head>
        <title>{companyName}</title>
        <link rel="icon" type="image" sizes="16x16" href={logoImage} />
      </Head>

      <ANTDLayout.Header
        className={cn(styles.layoutHeader, {
          [styles.hasScrolled]: hasScrolled,
        })}
      >
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

      {top}
      <ANTDLayout.Content className={cn(styles.layoutBody)}>
        <div style={{ padding: 24, minHeight: 380 }}>{children}</div>
      </ANTDLayout.Content>

      <ANTDLayout.Footer
        className={cn(styles.footer, {
          [styles.hasScrolled]: !hasScrolledBottom,
        })}
      >
        Piston Wraps ©2023
      </ANTDLayout.Footer>
    </ANTDLayout>
  );
};

export default Layout;
