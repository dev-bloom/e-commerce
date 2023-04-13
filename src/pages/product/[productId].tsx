import React, { PropsWithChildren, useRef } from "react";
import styles from "./product.module.scss";
import { GlobalOutlined, ShoppingCartOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { Row, Col, Carousel, Card, Space, Tag, Button, Select } from "antd";
import { Product } from "../api/products";
import Link from "next/link";

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
    height: "450px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  const refContainer = useRef(null)
  const price = product.discountPercent ? product.price * (1 - product.discountPercent / 100) : undefined
  const { Meta } = Card;
  const arr = [1, 2, 3, 4, 5, 6, 7, 8]


  return (
    <>
      <nav className={styles.nav}>
        <Link href={`/`}><Image alt="logo" src={logo} width={120} height={60} /></Link>
        <div>
          <GlobalOutlined className={styles.icons} />
          <ShoppingCartOutlined className={styles.icons} />
        </div>
      </nav>

      <div className="product-info">
        <Row className={styles.row}>
          <Col span={14}>
            <div className={styles.carousel}>
              <Carousel>
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
            </div>

          </Col>
          <Col span={10}><div className={styles.carousel}><Card title={product.name} bordered={false} style={{ width: 570 }}>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error sint nesciunt tempora quia beatae consequuntur ratione laudantium, quis placeat tempore doloribus doloremque laborum et nobis facere magnam consequatur ex. Rem!</p>
            <p className={price ? styles.discount : styles.nodiscount}>$ {product.price}</p>
            {price && <p className={styles.dprice}><b>$ {price}</b></p>}
            {price && <Tag bordered={false} color="red">
              {product.discountPercent}% OFF
            </Tag>}
            <p>{product.stock ? `${product.stock} unidades disponibles` : 'No hay unidades disponibles'}</p>
            <Space size={[0, 'small']} wrap>
              {product.tags.map((tag, i) => {
                return (
                  <Tag key={i} bordered={false}>{tag}</Tag>
                )
              })}

            </Space>
            <br /><br />
            <Select
              className={styles.select}
              defaultValue="1"
              style={{ width: 60 }}
              options={[{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }, { value: '5', label: '5' }]}
            />
            <Button type="primary" size={'large'}>
              Añadir al carrito {<ShoppingCartOutlined />}
            </Button>
          </Card></div></Col>
        </Row>
        <Row>
          <Col className={styles.carousel} span={24}><h2>Productos relacionados</h2></Col>
        </Row>
        <Row className={styles.rowRelated}>
          <LeftOutlined className={styles.buttons} />
          <div className={styles.related} ref={refContainer}>
            {arr.map((card, i) => {
              return (<Card
                key={i}
                hoverable
                style={{
                  width: 240,
                }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              >
                <Meta title="Europe Street beat" description="www.instagram.com" />
              </Card>)
            })}
          </div>
          <RightOutlined className={styles.buttons} />
        </Row>
      </div>
    </>
  );
};

export default ProductId;
