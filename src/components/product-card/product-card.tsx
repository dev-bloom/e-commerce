import { Card, Space, Tag } from "antd";
import cn from "classnames";
import Link from "next/link";
import type { ReactElement } from "react";
import React, { useMemo } from "react";

import type { Product } from "@/types";
import { getFirstProductImageURL } from "@/utils/helpers";

import styles from "./product-card.module.scss";

interface Props {
  card: Product;
  className?: string;
}

const visibleTags = 2;

const ProductCard = ({ card, className }: Props): ReactElement => {
  const {
    fields: { discountPercent: discount, price, slug, name, tags },
  } = card;

  const hasMoreTags = tags.length > visibleTags;
  const tagList = useMemo(() => tags.slice(0, visibleTags), [tags]);

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
        <Space size={[0, "small"]} className={styles.tagList}>
          {tagList.map((tag, i) => (
            <Tag role="tag" key={i} bordered={false}>
              {tag}
            </Tag>
          ))}
          {hasMoreTags && (
            <Tag role="tag" key="more" bordered={false}>
              +{tags.length - visibleTags}
            </Tag>
          )}
        </Space>
      </Card>
    </Link>
  );
};

export default ProductCard;
