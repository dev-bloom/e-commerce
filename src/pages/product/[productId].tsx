import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Row, Col, Carousel, Card, Space, Tag, Button, Select } from "antd";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  ShoppingCartOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Product } from "@/pages/api/products";
import {
  addItem,
  removeItem,
  selectIsProductInCart,
  selectProductCountForSlug,
} from "@/store/cart";
import Layout from "@/components/layout/layout";
import styles from "./product.module.scss";
import { getImageURLFromAsset, getFirstProductImageURL } from "@/utils/helpers";
import { BaseOptionType } from "antd/es/select";

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
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const productCount = useSelector(
    selectProductCountForSlug(product.fields.slug)
  );
  const isProductInCart = useSelector(
    selectIsProductInCart(product.fields.slug)
  );
  const { fields: productFields } = product;
  const discountPercent = productFields.discountPercent ?? 0;
  const price =
    product.fields.price - (product.fields.price * discountPercent) / 100;
  const ProductBody = documentToReactComponents(productFields.longDescription);
  const { Meta } = Card;

  useEffect(() => {
    setQuantity(productCount || 1);
  }, [productCount]);

  const handleAddToCart = () => {
    if (quantity === 0) {
      dispatch(removeItem(product.fields.slug));
      return;
    }
    dispatch(
      addItem({
        product,
        quantity,
      })
    );
  };

  console.log(productFields);

  return (
    <Layout>
      <div className="product-info">
        <Row className={styles.row}>
          <Col span={14}>
            <div className={styles.carousel}>
              <Carousel
                dotPosition="bottom"
                draggable={true}
                swipeToSlide={true}
              >
                {!productFields.gallery?.length && (
                  <div>
                    <img
                      style={contentStyle}
                      src={getImageURLFromAsset()}
                      alt="product"
                    />
                  </div>
                )}
                {productFields.gallery?.map((image, i) => (
                  <div key={i}>
                    <img
                      style={contentStyle}
                      src={getImageURLFromAsset(image)}
                      alt="product"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </Col>
          <Col span={10}>
            <div className={styles.carousel}>
              <Card title={productFields.name} bordered={false}>
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
                  value={quantity}
                  onChange={(value) => setQuantity(value)}
                  style={{ width: 60 }}
                  options={
                    [
                      isProductInCart ? { value: 0, label: "0" } : false,
                      { value: 1, label: "1" },
                      { value: 2, label: "2" },
                      { value: 3, label: "3" },
                      { value: 4, label: "4" },
                      { value: 5, label: "5" },
                    ].filter(Boolean) as BaseOptionType[]
                  }
                />
                <Button type="primary" size={"large"} onClick={handleAddToCart}>
                  {isProductInCart ? "Actualizar carrito" : "Añadir al carrito"}
                  {<ShoppingCartOutlined />}
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
          {productFields.relatedProducts?.map((card, i) => {
            console.debug(card);
            return (
              <Link key={i} href={`/product/${card.fields.slug}`}>
                <Card
                  hoverable
                  style={{ width: 250 }}
                  cover={
                    <div
                      style={{
                        backgroundImage: `url(${getFirstProductImageURL(
                          card
                        )})`,
                        width: "100%",
                        height: "250px",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                  }
                >
                  <Meta title={card.fields.name} />
                  <p>
                    $
                    {card.fields.discountPercent
                      ? card.fields.price *
                        (1 - card.fields.discountPercent / 100)
                      : card.fields.price}
                  </p>
                  {!!card.fields.discountPercent && (
                    <Tag bordered={false} color="green">
                      {card.fields.discountPercent}% OFF
                    </Tag>
                  )}
                  <Space size={[0, "small"]} wrap>
                    {card.fields.tags.map((tag, i) => {
                      return (
                        <Tag key={i} bordered={false}>
                          {tag}
                        </Tag>
                      );
                    })}
                  </Space>
                </Card>
              </Link>
            );
          })}
        </Row>
      </div>
    </Layout>
  );
};

export default ProductId;
