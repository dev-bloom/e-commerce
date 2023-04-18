import React, { PropsWithChildren, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Row, Col, Card, Space, Tag, Button, Select } from "antd";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Product } from "@/pages/api/products";
import RelatedCard from "@/components/page-components/detail-screen/RelatedCard";
import {
  addItem,
  removeItem,
  selectIsProductInCart,
  selectProductCountForSlug,
} from "@/store/cart";
import Layout from "@/components/layout/layout";
import styles from "./product.module.scss";
import { getImageURLFromAsset } from "@/utils/helpers";
import { BaseOptionType } from "antd/es/select";
import { wrapper } from "../../store/index";

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

const ProductId = ({ product }: PropsWithChildren<{ product: Product }>) => {
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

  const relatedPrices = productFields.relatedProducts?.map((card) => {
    return (
      <p key={card.fields.slug} className={styles.dprices}>
        $
        {card.fields.discountPercent
          ? card.fields.price * (1 - card.fields.discountPercent / 100)
          : card.fields.price}
      </p>
    );
  });

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

  useEffect(() => {
    setQuantity(productCount || 1);
  }, [productCount]);

  console.log(productFields);

  return (
    <Layout>
      <div className="product-info">
        <Row className={styles.row}>
          <Col span={12}>
            <div className={styles.wrapper}>
              <Carousel
                showArrows={true}
                width={"100%"}
                dynamicHeight={true}
                showThumbs={false}
              >
                {productFields.gallery?.map((image) => (
                  <div key={image.sys.id}>
                    <img
                      className={styles.carouselImg}
                      src={getImageURLFromAsset(image)}
                      alt="product"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.wrapper}>
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
                  <Tag bordered={false} color="green">
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
          <Col span={24}>
            <h2>Productos relacionados</h2>
          </Col>
        </Row>
        <Row className={styles.related}>
          {productFields.relatedProducts?.map((card) => (
            <RelatedCard card={card} key={card.fields.slug} />
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default ProductId;
