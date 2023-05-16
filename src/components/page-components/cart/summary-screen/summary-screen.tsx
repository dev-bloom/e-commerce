import { DollarOutlined } from "@ant-design/icons";
import { Button, List, Divider, Row, Col, Typography, Space } from "antd";
import type { PropsWithChildren } from "react";
import { useSelector } from "react-redux";

import type { CartItem } from "@/store/cart";
import { selectCartItems, selectTotalPrice } from "@/store/cart";
import { discountedPrice } from "@/utils/helpers";

import CartHeader from "../cart-header/cart-header";

import styles from "./summary-screen.module.scss";

interface SummaryScreenProps {
  onNextStep: () => void;
}

// TODO: Get user info from redux
const userInfo = {
  name: "Nombre Apellido",
  phone: "123456789",
  email: "test@example.com",
  address: "Calle 1234",
  city: "Ciudad",
  state: "Provincia",
  country: "País",
  zipCode: "1234",
  comments: "Comentarios",
};

const InfoItem = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => (
  <Typography.Text>
    <b>{title}</b>
    <div>{children}</div>
  </Typography.Text>
);

const VerticalColDivider = () => (
  <Col xs={2} className={styles.verticalCenter}>
    <Divider type="vertical" style={{ height: "100%" }} />
  </Col>
);

const SummaryScreen = ({
  onNextStep,
}: PropsWithChildren<SummaryScreenProps>) => {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <div className={styles.summaryScreen}>
      <CartHeader title="Resúmen de Compra" />
      <Row>
        <Col xs={11} className={styles.userInfoContainer}>
          <Typography.Title level={4}>Envío y Facturación</Typography.Title>
          <Row>
            <Col xs={11} className={styles.ColContainer}>
              <Space direction="vertical">
                <InfoItem title="Nombre">{userInfo.name}</InfoItem>
                <InfoItem title="Teléfono">{userInfo.phone}</InfoItem>
                <InfoItem title="Localidad">{userInfo.city}</InfoItem>
                <InfoItem title="Código Postal">{userInfo.zipCode}</InfoItem>
                <InfoItem title="Comentarios">{userInfo.comments}</InfoItem>
              </Space>
            </Col>
            <VerticalColDivider />
            <Col xs={11} className={styles.ColContainer}>
              <Space direction="vertical">
                <InfoItem title="Email">{userInfo.email}</InfoItem>
                <InfoItem title="Dirección">{userInfo.address}</InfoItem>
                <InfoItem title="Departamento">{userInfo.state}</InfoItem>
                <InfoItem title="Pais">{userInfo.country}</InfoItem>
              </Space>
            </Col>
          </Row>
        </Col>
        <VerticalColDivider />
        <Col xs={11} className={styles.productListContainer}>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={cartItems}
            footer={
              <Row gutter={[16, 24]} justify="space-around">
                <Col className={styles.verticalCenter}>
                  <b>Total:</b> ${totalPrice}
                </Col>
                <Col className={styles.verticalCenter}>
                  <Button
                    icon={<DollarOutlined />}
                    size="large"
                    shape="round"
                    type="primary"
                    disabled={!cartItems.length}
                    onClick={onNextStep}
                  >
                    Confirmar Orden
                  </Button>
                </Col>
              </Row>
            }
            renderItem={(product: CartItem) => {
              const {
                product: { fields: productFields },
                quantity,
              } = product;
              return (
                <>
                  <List.Item
                    key={productFields.slug}
                    extra={
                      <div className={styles.itemPrice}>
                        <b>${discountedPrice(product.product) * quantity}</b>
                      </div>
                    }
                  >
                    <List.Item.Meta
                      title={
                        <Typography.Title level={5}>
                          {productFields.name}
                        </Typography.Title>
                      }
                      description={`$${discountedPrice(
                        product.product
                      )} c/u, ${quantity} unidades`}
                    />
                  </List.Item>
                </>
              );
            }}
          ></List>
        </Col>
      </Row>
    </div>
  );
};

export default SummaryScreen;
