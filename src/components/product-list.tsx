import { Product } from "@/types";
import Link from "next/link";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Row, Col } from "antd";
import { PropsWithChildren } from "react";
import { getFirstProductImageURL } from "@/utils/helpers";

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
            <Link href={`/product/${productFields.slug}`}>
              <Card
                style={{ width: 300 }}
                cover={
                  <img alt="example" src={getFirstProductImageURL(product)} />
                }
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Card.Meta
                  title={productFields.name}
                  description={productFields.shortDescription}
                />
              </Card>
            </Link>
          </Col>
        );
      })}
    </Row>
  );
}
