import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  Button,
  List,
  Select,
  Steps,
  Typography,
  theme,
  Space,
  Divider,
  Row,
  Col,
} from "antd";
import { discountedPrice, getFirstProductImageURL } from "@/utils/helpers";
import Layout from "@/components/layout/layout";
import {
  CartItem,
  removeItem,
  selectCartItems,
  selectTotalPrice,
  updateItemQuantity,
} from "@/store/cart";
import { Product } from "./api/products";

const Cart = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  const handleUpdateCartItem =
    ({ fields: productFields }: Product) =>
    (newAmount: number) => {
      if (newAmount === 0) {
        dispatch(removeItem(productFields.slug));
        return;
      }
      dispatch(
        updateItemQuantity({
          slug: productFields.slug,
          quantity: newAmount,
        })
      );
    };

  const steps = [
    {
      title: "Carrito",
      content: (
        <>
          <Divider>
            <Typography.Text>Resumen de productos</Typography.Text>
          </Divider>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={cartItems}
            footer={
              <Row gutter={[16, 24]} justify="space-around">
                <Col>
                  <b>Total:</b> ${totalPrice}
                </Col>
                <Col>
                  <Button
                    disabled={!cartItems.length}
                    onClick={() => setCurrent(1)}
                  >
                    Continuar
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
                <List.Item
                  key={productFields.slug}
                  actions={[
                    <Select
                      key="select"
                      value={quantity}
                      onChange={handleUpdateCartItem(product.product)}
                      style={{ width: 60 }}
                      options={[
                        { value: 0, label: "0" },
                        { value: 1, label: "1" },
                        { value: 2, label: "2" },
                        { value: 3, label: "3" },
                        { value: 4, label: "4" },
                        { value: 5, label: "5" },
                      ]}
                    />,
                  ]}
                  extra={
                    <div
                      style={{
                        borderRadius: "10px",
                        width: "300px",
                        height: "150px",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundImage: `url(${getFirstProductImageURL(
                          product.product
                        )})`,
                      }}
                    ></div>
                  }
                >
                  <List.Item.Meta
                    title={
                      <a href={`/product/${productFields.slug}`}>
                        {productFields.name}
                      </a>
                    }
                    description={`$${discountedPrice(
                      product.product
                    )} c/u, ${quantity} unidades`}
                  />
                  <b>${discountedPrice(product.product) * quantity}</b>
                </List.Item>
              );
            }}
          ></List>
        </>
      ),
    },
    {
      title: "Información envío y facturación",
      content: "Second-content",
    },
    {
      title: "Confirmación",
      content: "Last-content",
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <Layout>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
    </Layout>
  );
};

export default Cart;
