import React, { ReactElement } from "react";
import { Card, Space, Tag } from "antd";
import Link from "next/link";
import { getFirstProductImageURL } from "@/utils/helpers";
import { Product } from "@/types";
import cn from "classnames";
import styles from "./product-card.module.scss";

interface Props {
  card: Product;
  className?: string;
}

const ProductCard = ({ card, className }: Props): ReactElement => {
  const {
    fields: { discountPercent: discount, price, slug, name, tags },
  } = card;

  const realPrice = price - (price * (discount ?? 0)) / 100;

  return (
    <Link className={className} key={slug} href={`/product/${slug}`}>
      <Card
        hoverable
        className={cn(styles.relatedCard)}
        cover={
          <div
            className={styles.cardImg}
            style={{
              backgroundImage: `url(${getFirstProductImageURL(card)})`,
            }}
          />
        }
      >
        <Card.Meta title={name} />
        <p>
          ${realPrice}
          {!!discount && (
            <Tag className={styles.dprices} bordered={false} color="green">
              {discount}% OFF
            </Tag>
          )}
        </p>
        <Space size={[0, "small"]}>
          {tags.map((tag, i) => (
            <Tag role="tag" key={i} bordered={false}>
              {tag}
            </Tag>
          ))}
        </Space>
      </Card>
    </Link>
  );
};

export default ProductCard;
