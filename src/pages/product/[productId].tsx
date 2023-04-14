import React, { PropsWithChildren, useRef } from "react";
import styles from "./product.module.scss";
import {
  GlobalOutlined,
  ShoppingCartOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { Row, Col, Carousel, Card, Space, Tag, Button, Select } from "antd";
import { Product } from "../api/products";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export async function getStaticPaths() {
  const productsResponse = await fetch("http://localhost:3000/api/products");
  const formattedProducts: Product[] = await productsResponse.json();
  const paths = formattedProducts.map((product: Product) => ({
    params: { productId: product.fields.slug },
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
  const formattedProduct: Product = await product.json();

  return {
    props: {
      product: formattedProduct,
    },
  };
}

const contentStyle: React.CSSProperties = {
  width: "100%",
  color: "#fff",
  height: "400px",
  textAlign: "center",
};

const ProductId = ({ product }: PropsWithChildren<{ product: Product }>) => {
  const refContainer = useRef(null);

  console.debug(product);
  const { fields: productFields } = product;
  const discountPercent = productFields.discountPercent ?? 0;
  const price =
    product.fields.price - (product.fields.price * discountPercent) / 100;

  const ProductBody = documentToReactComponents(productFields.longDescription);

  return (
    <>
      <nav className={styles.nav}>
        <Link href={`/`}>
          <Image alt="logo" src={logo} width={120} height={60} />
        </Link>
        <div>
          <GlobalOutlined className={styles.icons} />
          <ShoppingCartOutlined className={styles.icons} />
        </div>
      </nav>

      <div className="product-info">
        <Row className={styles.row}>
          <Col span={14}>
            <div className={styles.carousel}>
              <Carousel
                dotPosition="right"
                slidesToShow={3}
                centerMode={true}
                draggable={true}
                swipeToSlide={true}
                touchThreshold={50}
                focusOnSelect={true}
              >
                {productFields.gallery?.map((image, i) => (
                  <div key={i}>
                    <img
                      style={contentStyle}
                      src={`https:${image.fields?.file?.url}`}
                      alt="product"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </Col>
          <Col span={10}>
            <div className={styles.carousel}>
              <Card
                title={productFields.name}
                bordered={false}
                style={{ width: 570 }}
              >
                {ProductBody}
                <p
                  className={
                    discountPercent ? styles.discount : styles.nodiscount
                  }
                >
                  $ {productFields.price}
                </p>
                {!!discountPercent && (
                  <p className={styles.dprice}>
                    <b>$ {price}</b>
                  </p>
                )}
                {!!discountPercent && (
                  <Tag bordered={false} color="red">
                    {productFields.discountPercent}% OFF
                  </Tag>
                )}
                <p>
                  {productFields.stock
                    ? `${productFields.stock} unidades disponibles`
                    : "No hay unidades disponibles"}
                </p>
                <Space size={[0, "small"]} wrap>
                  {productFields.tags.map((tag, i) => {
                    return (
                      <Tag key={i} bordered={false}>
                        {tag}
                      </Tag>
                    );
                  })}
                </Space>
                <br />
                <br />
                <Select
                  className={styles.select}
                  defaultValue="1"
                  style={{ width: 60 }}
                  options={[
                    { value: 1, label: "1" },
                    { value: 2, label: "2" },
                    { value: 3, label: "3" },
                    { value: 4, label: "4" },
                    { value: 5, label: "5" },
                  ]}
                />
                <Button type="primary" size={"large"}>
                  Añadir al carrito {<ShoppingCartOutlined />}
                </Button>
              </Card>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={styles.carousel} span={24}>
            <h2>Productos relacionados</h2>
          </Col>
        </Row>
        <Row className={styles.rowRelated}>
          <LeftOutlined className={styles.buttons} />
          <div className={styles.related} ref={refContainer}>
            {productFields.gallery?.map((card, i) => {
              return (
                <Card
                  key={i}
                  hoverable
                  style={{
                    width: 240,
                  }}
                  cover={
                    <img
                      alt="example"
                      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                    />
                  }
                >
                  <Card.Meta
                    title="Europe Street beat"
                    description="www.instagram.com"
                  />
                </Card>
              );
            })}
          </div>
          <RightOutlined className={styles.buttons} />
        </Row>
      </div>
    </>
  );
};

export default ProductId;
