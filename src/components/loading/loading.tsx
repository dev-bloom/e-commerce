import { Spin } from "antd";

import styles from "./loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.circle}>
        <Spin size="large" />
        <h1 className={styles.text}>Loading...</h1>
      </div>
    </div>
  );
};

export default Loading;
