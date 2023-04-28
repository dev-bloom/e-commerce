import React, { PropsWithChildren } from "react";
import { Button, Card, Typography } from "antd";
import { Product } from "@/types";
import { getFirstProductImageURL } from "@/utils/helpers";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import styles from "./hero.module.scss";

const { Title, Paragraph } = Typography;

type HeroProps = PropsWithChildren<{
  product: Product;
}>;

const Hero = ({ product }: HeroProps) => {
  const image = getFirstProductImageURL(product);
  const { name, longDescription, slug } = product.fields;
  const ProductBody = documentToReactComponents(longDescription);
  return (
    <div className={styles.hero}>
      <img className={styles.image} src={image} alt={name} />
      <div className={styles.content}>
        <Title className={styles.title}>{name}</Title>
        <Card className={styles.card}>
          <Paragraph>{ProductBody}</Paragraph>
          <Link href={`/product/${slug}`}>
            <Button type="primary" size="large">
              Ver más
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default Hero;
