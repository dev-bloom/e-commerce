import React, { PropsWithChildren } from "react";
import { Button, Typography } from "antd";
import { Product } from "@/types";
import { getFirstProductImageURL } from "@/utils/helpers";
import styles from "./Hero.module.scss";

const { Title, Paragraph } = Typography;

type HeroProps = PropsWithChildren<{
  product: Product;
}>;

const Hero = ({ product }: HeroProps) => {
  const image = getFirstProductImageURL(product);
  const { name, shortDescription } = product.fields;
  return (
    <div className={styles.hero}>
      <img className={styles.image} src={image} alt={name} />
      <div className={styles.content}>
        <Title className={styles.title}>{name}</Title>
        <Paragraph>{shortDescription}</Paragraph>
        <Button type="primary" size="large">
          View Product
        </Button>
      </div>
    </div>
  );
};

export default Hero;
