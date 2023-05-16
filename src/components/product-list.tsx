import { Row, Col } from "antd";
import type { PropsWithChildren } from "react";

import type { Product } from "@/types";

import ProductCard from "./product-card/product-card";

export default function ProductList({
  products,
}: PropsWithChildren<{
  products: Product[];
}>) {
  return (
    <Row gutter={[16, 16]}>
      {products.map((product) => {
        const { fields: productFields } = product;

        return (
          <Col key={productFields.name} xs={24} sm={12} md={8} lg={6} xl={4}>
            <ProductCard card={product} />
          </Col>
        );
      })}
    </Row>
  );
}
