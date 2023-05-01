import { Divider, Typography } from "antd";

import styles from "./cart-header.module.scss";

const CartHeader = ({ title }: { title: string }) => (
  <Divider>
    <Typography.Title type="secondary" className={styles.title} level={3}>
      {title}
    </Typography.Title>
  </Divider>
);

export default CartHeader;
