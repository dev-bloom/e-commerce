import { Button, Form, Row, Col, Input, Select } from "antd";
import type { PropsWithChildren } from "react";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

interface UserScreenProps {
  onNextStep: () => void;
}

const UserScreen = ({ onNextStep }: PropsWithChildren<UserScreenProps>) => {
  const [form] = Form.useForm();
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Select.Option value="57">+57</Select.Option>
      </Select>
    </Form.Item>
  );

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    onNextStep();
  };

  return (
    <Row justify="center" gutter={[10, 12]}>
      <Col>
        <Form
          {...formItemLayout}
          form={form}
          name="userInfo"
          onFinish={onFinish}
          initialValues={{
            prefix: "57",
          }}
          style={{ maxWidth: 600, padding: 20 }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="Correo electrónico"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="names"
            label="Nombres"
            rules={[
              {
                required: true,
                message: "Please input your names!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="surnames"
            label="Apellidos"
            rules={[
              {
                required: true,
                message: "Please input your surnames!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Teléfono"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Continuar
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default UserScreen;
