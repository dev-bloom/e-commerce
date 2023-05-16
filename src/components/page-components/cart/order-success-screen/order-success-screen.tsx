import { CheckCircleOutlined } from "@ant-design/icons";
import { Card, Result, Button } from "antd";
import Link from "next/link";

import styles from "./order-success-screen.module.scss";

interface OrderSuccessScreenProps {
  onNextStep: () => void;
}

const OrderSuccessScreen = ({}: OrderSuccessScreenProps) => {
  const orderNumber = "123456789";
  const orderNumberLink = (
    <Link href={`/order/${orderNumber}`}>#{orderNumber}</Link>
  );
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Result
          icon={<CheckCircleOutlined className={styles.checkIcon} />}
          title="Order Successful!"
          subTitle={
            <span>
              Your order number is {orderNumberLink}. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </span>
          }
          extra={[
            <Button href={`/order/${orderNumber}`} type="primary" key="console">
              Revisar pedido
            </Button>,
            <Button key="buy">Volver a inicio</Button>,
          ]}
        />
      </Card>
    </div>
  );
};

export default OrderSuccessScreen;
