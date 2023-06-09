import { Input, Typography } from "antd";
import cn from "classnames";
import { useRouter } from "next/router";
import type { PropsWithChildren } from "react";
import React, { useMemo } from "react";

import type { FeaturedProducts } from "@/types";

import ProductCard from "../product-card/product-card";

import styles from "./hero.module.scss";

type HeroProps = PropsWithChildren<{
  featuredProducts: FeaturedProducts | null;
}>;

const Hero = ({ featuredProducts }: HeroProps) => {
  const router = useRouter();
  const shuffledProductList = useMemo(() => {
    if (!featuredProducts?.fields.productList) {
      return [];
    }
    const [firstProduct, secondProduct, thirdProduct] =
      featuredProducts.fields.productList;
    return [thirdProduct, firstProduct, secondProduct];
  }, [featuredProducts]);

  const handleSearch = (value: string) => {
    router.push(`/products?query=${value}`);
    console.log(value);
  };

  return (
    <div className={styles.hero}>
      <section className={cn(styles.section, styles.firstSection)}>
        <div className={cn(styles.firstSectionCorrection)}>
          <div className={styles.cardsContainer}>
            {shuffledProductList.map((product) => (
              <ProductCard
                key={product.sys.id}
                className={styles.card}
                card={product}
              />
            ))}
          </div>

          <Typography.Title className={styles.title} level={1}>
            {featuredProducts?.fields.title}
          </Typography.Title>
        </div>
      </section>
      <section className={cn(styles.section, styles.secondSection)}>
        <Input.Search
          allowClear
          className={styles.input}
          placeholder="Buscas algo?"
          bordered={false}
          size="large"
          onSearch={handleSearch}
        />
      </section>
    </div>
  );
};

export default Hero;
