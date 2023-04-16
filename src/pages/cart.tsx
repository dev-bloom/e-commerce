import { useState } from "react";
import { Steps, theme } from "antd";
import Layout from "@/components/layout/layout";
import CartScreen from "@/components/page-components/cart/cart-screen";
import UserScreen from "@/components/page-components/cart/user-screen";
import SummaryScreen from "@/components/page-components/cart/summary-screen";

const Cart = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const onNextStep = () => {
    setCurrent(current + 1);
  };

  const steps = [
    {
      title: "Carrito",
      content: <CartScreen onNextStep={onNextStep} />,
    },
    {
      title: "Información envío y facturación",
      content: <UserScreen onNextStep={onNextStep} />,
    },
    {
      title: "Revisión",
      content: <SummaryScreen onNextStep={onNextStep} />,
    },
    {
      title: "Confirmación de pedido",
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
