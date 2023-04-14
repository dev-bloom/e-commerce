import { Product } from "@/pages/api/products";
import Link from "next/link";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Row, Col } from "antd";
import { PropsWithChildren } from "react";

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
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Card.Meta
                  avatar={
                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                  }
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
