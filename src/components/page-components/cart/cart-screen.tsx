import { discountedPrice, getFirstProductImageURL } from "@/utils/helpers";
import { Button, List, Select, Typography, Divider, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  CartItem,
  removeItem,
  selectCartItems,
  selectTotalPrice,
  updateItemQuantity,
} from "@/store/cart";
import { Product } from "@/types";
import { PropsWithChildren } from "react";

interface CartScreenProps {
  onNextStep: () => void;
}

const CartScreen = ({ onNextStep }: PropsWithChildren<CartScreenProps>) => {
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
  return (
    <>
      <Divider>
        <Typography.Text>Resúmen de productos</Typography.Text>
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
              <Button disabled={!cartItems.length} onClick={onNextStep}>
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
  );
};

export default CartScreen;
