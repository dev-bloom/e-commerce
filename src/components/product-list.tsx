import { Product } from '@/pages/api/products';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Row, Col } from 'antd';
import { useEffect, useState } from 'react';


export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const init = async () => {
    const productsResponse = await fetch("/api/products");
    const formattedProducts = await productsResponse.json();
    setProducts(formattedProducts);
  }
  useEffect(() => {
    init()
  }, [])
  useEffect(() => {
    console.log(products)
  }, [products])

  return (
    <Row gutter={[16, 16]}>
      {products.map((product) => (
        <Col key={product.name} span={6} >
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
              avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
              title={product.name}
              description={product.description}
            />
          </Card>
        </Col>
      ))}

    </Row>
  )
}