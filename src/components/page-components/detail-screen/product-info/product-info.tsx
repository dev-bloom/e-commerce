import { ShoppingCartOutlined } from "@ant-design/icons";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Row, Col, Card, Space, Tag, Button, Select } from "antd";
import type { BaseOptionType } from "antd/es/select";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";

import ProductCard from "@/components/product-card";
import type { Product } from "@/types";
import { getImageURLFromAsset } from "@/utils/helpers";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./product-info.module.scss";

interface ProductInfoProps {
  product: Product;
  productCount: number;
  isProductInCart: boolean;
  onAddToCart: (_quantity: number) => void;
  onRemoveFromCart: () => void;
}

const ProductInfo = ({
  product,
  productCount,
  isProductInCart,
  onAddToCart,
  onRemoveFromCart,
}: ProductInfoProps) => {
  const { fields: productFields } = product;
  const [quantity, setQuantity] = useState(1);
  const discountPercent = productFields.discountPercent ?? 0;
  const price =
    productFields.price - (productFields.price * discountPercent) / 100;

  const productBody = documentToReactComponents(productFields.longDescription);

  const handleAddToCart = () => {
    if (quantity === 0) {
      onRemoveFromCart();
      return;
    }
    onAddToCart(quantity);
  };

  useEffect(() => {
    setQuantity(productCount || 1);
  }, [productCount]);

  return (
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
              {productFields.gallery?.length
                ? productFields.gallery?.map((image) => (
                    <img
                      key={image.sys.id}
                      className={styles.carouselImg}
                      src={getImageURLFromAsset(image)}
                      alt="product"
                    />
                  ))
                : [
                    <img
                      key="placeholder"
                      className={styles.carouselImg}
                      src={getImageURLFromAsset()}
                      alt="product"
                    />,
                  ]}
            </Carousel>
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.wrapper}>
            <Card title={productFields.name} bordered={false}>
              {productBody}
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
              <div className={styles.productActions}>
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
                <Button
                  data-testid="add-to-cart-btn"
                  type="primary"
                  size={"large"}
                  onClick={handleAddToCart}
                >
                  {isProductInCart ? "Actualizar carrito" : "Añadir al carrito"}
                  {<ShoppingCartOutlined />}
                </Button>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
      {!!productFields.relatedProducts?.length && (
        <Row className={styles.related}>
          <Col span={24}>
            <h2>Productos relacionados</h2>
          </Col>
          {productFields.relatedProducts.map((card) => (
            <ProductCard card={card} key={card.fields.slug} />
          ))}
        </Row>
      )}
    </div>
  );
};

export default ProductInfo;
