import { Product } from "@/types";
import { Row, Col } from "antd";
import { PropsWithChildren } from "react";
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
          <Col key={productFields.name} span={6}>
            <ProductCard card={product} />
          </Col>
        );
      })}
    </Row>
  );
}
