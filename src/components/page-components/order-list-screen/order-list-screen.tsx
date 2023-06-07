import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd"; 

import { Button } from "antd";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import styles from "./order-list-screen.module.scss";

interface DataType {
  key: React.Key;
  orderId: number;
  product: string;
  quantity: number;
  price: number;
  date: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
    render: (text) => <a>{text}</a>,
    width: 150,
  },
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
    width: 200,
    },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "address 1",
    ellipsis: true,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    ellipsis: true,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    ellipsis: true,
  },
];

const data = [
  {
    key: "1",
    orderId: 1,
    product: "Tiffany Blue",
    quantity: 3,
    price: 2.99,
    date: "12 May 202'",
  },
  {
    key: "2",
    orderId: 2,
    product: "Tiffany Blue",
    quantity: 3,
    price: 2.99,
    date: "12 May 2023",
  },
  {
    key: "3",
    orderId: 3,
    product: "Tiffany Blue",
    quantity: 3,
    price: 2.99,
    date: "12 May 2023",
  },
];

const OrderListScreen = () => {
  return ( 
    <div className={styles.orderListContainer}>
      <Input placeholder="default size" prefix={<UserOutlined />} />
      <br />
      <div className={styles.submitButton}>
        <Button type="primary" className={styles.buttonPrimary}> 
          Submit 
        </Button>
      </div>
      <br />
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default OrderListScreen;