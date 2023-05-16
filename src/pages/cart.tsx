import { Steps, theme } from "antd";
import { useState } from "react";

import Layout from "@/components/layout/layout";
import CartScreen from "@/components/page-components/cart/cart-screen";
import OrderSuccessScreen from "@/components/page-components/cart/order-success-screen/order-success-screen";
import SummaryScreen from "@/components/page-components/cart/summary-screen";
import UserScreen from "@/components/page-components/cart/user-screen";
import PageHead from "@/components/page-head/page-head";
import {
  PageComponentProps,
  getGlobalStaticProps,
} from "@/utils/api/api.helpers";

export async function getStaticProps() {
  return getGlobalStaticProps();
}

type CartProps = PageComponentProps;

const Cart: CartProps = ({ branding }) => {
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
      title: "Envío y Facturación",
      content: <UserScreen onNextStep={onNextStep} />,
    },
    {
      title: "Revisión",
      content: <SummaryScreen onNextStep={onNextStep} />,
    },
    {
      title: "Confirmación",
      content: <OrderSuccessScreen onNextStep={onNextStep} />,
    },
  ];

  const handleStepChange = (current: number) => {
    setCurrent(current);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    overflow: "hidden",
  };

  return (
    <Layout branding={branding}>
      <PageHead branding={branding} title={steps[current].title}></PageHead>
      <Steps current={current} items={items} onChange={handleStepChange} />
      <div style={contentStyle}>{steps[current].content}</div>
    </Layout>
  );
};

export default Cart;
