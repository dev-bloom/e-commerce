import { Button, List, Select, Row, Col } from "antd";
import type { PropsWithChildren } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { CartItem } from "@/store/cart";
import {
  removeItem,
  selectCartItems,
  selectTotalPrice,
  updateItemQuantity,
} from "@/store/cart";
import type { Product } from "@/types";
import { discountedPrice, getFirstProductImageURL } from "@/utils/helpers";

import CartHeader from "../cart-header/cart-header";

import styles from "./cart-screen.module.scss";

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
    <div className={styles.cartScreen}>
      <CartHeader title="Resúmen de productos" />
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
    </div>
  );
};

export default CartScreen;
