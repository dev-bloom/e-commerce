import { Layout as ANTDLayout, Input } from "antd";
import styles from "./layout.module.scss";
import { FC } from "react";
import { PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <ANTDLayout>
      <ANTDLayout.Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          backgroundColor: "white",
        }}
        className={styles.layoutHeader}
      >
        Piston Wraps
        <Input.Search placeholder="input search text" style={{ width: 200 }} />
      </ANTDLayout.Header>
      <ANTDLayout.Content className="site-layout" style={{ padding: "0 50px" }}>
        <div style={{ padding: 24, minHeight: 380 }}>{children}</div>
      </ANTDLayout.Content>
      <ANTDLayout.Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </ANTDLayout.Footer>
    </ANTDLayout>
  );
};

export default Layout;
