import React from "react";
import { Card, Space, Tag } from "antd";
import Link from "next/link";
import { getFirstProductImageURL } from "@/utils/helpers";
import { Product } from "@/pages/api/products";
import styles from "./realtedCard.module.scss";

interface Props {
  card: Product;
}

const RelatedCard = ({ card }: Props) => {
  const {
    fields: { discountPercent: discount, price, slug, name, tags },
  } = card;

  const realPrice = discount ? price * (1 - discount / 100) : price;

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
        <p className={discount ? styles.dprices : ""}>{realPrice}</p>
        {!!discount && (
          <Tag bordered={false} color="green">
            {discount}% OFF
          </Tag>
        )}
        <Space size={[0, "small"]} wrap>
          {tags.map((tag, i) => {
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
};

export default RelatedCard;
