import React, { ReactElement } from "react";
import { Card, Space, Tag } from "antd";
import Link from "next/link";
import { getFirstProductImageURL } from "@/utils/helpers";
import { Product } from "@/pages/api/products";
import styles from "./related-card.module.scss";

interface Props {
  card: Product;
}

const RelatedCard = ({ card }: Props): ReactElement => {
  const {
    fields: { discountPercent: discount, price, slug, name, tags },
  } = card;

  const realPrice = price - (price * discount) / 100;

  return (
    <Link key={slug} href={`/product/${slug}`}>
      <Card
        hoverable
        className={styles.relatedCard}
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
            <span>
              <Tag className={styles.dprices} bordered={false} color="green">
                {discount}% OFF
              </Tag>
            </span>
          )}
        </p>
        <Space size={[0, "small"]} wrap>
          {tags.map((tag, i) => (
            <Tag key={i} bordered={false}>
              {tag}
            </Tag>
          ))}
        </Space>
      </Card>
    </Link>
  );
};

export default RelatedCard;
