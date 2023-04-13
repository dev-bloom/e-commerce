import React, { PropsWithChildren } from "react";
import styles from "./product.module.scss";
import { GlobalOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { Row, Col, Carousel } from "antd";
import { Product } from "../api/products";

export async function getStaticPaths() {
  const productsResponse = await fetch("http://localhost:3000/api/products");
  const formattedProducts = await productsResponse.json();
  const paths = formattedProducts.map((product: Product) => ({
    params: { productId: product.slug },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;
  const product = await fetch(
    "http://localhost:3000/api/product?" +
      new URLSearchParams({ slug: productId })
  );
  const formattedProduct = await product.json();
  return {
    props: {
      product: formattedProduct,
    },
  };
}

const ProductId = ({ product }: PropsWithChildren<{ product: Product }>) => {
  console.debug(product);
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <>
      <nav className={styles.nav}>
        <Image alt="logo" src={logo} width={120} height={80} />
        <div>
          <GlobalOutlined className={styles.icons} />
          <ShoppingCartOutlined className={styles.icons} />
        </div>
      </nav>

      <div className="product-info">
        <Row className={styles.row}>
          <Col span={14}>
            <Carousel afterChange={onChange}>
              <div>
                <h3 style={contentStyle}>1</h3>
              </div>
              <div>
                <h3 style={contentStyle}>2</h3>
              </div>
              <div>
                <h3 style={contentStyle}>3</h3>
              </div>
              <div>
                <h3 style={contentStyle}>4</h3>
              </div>
            </Carousel>
          </Col>
          <Col span={10}>Columna2</Col>
        </Row>
      </div>
    </>
  );
};

export default ProductId;
