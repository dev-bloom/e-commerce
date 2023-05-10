import { Button, Form, Row, Col, Input, Select } from "antd";
import { useState } from "react";
import type { PropsWithChildren } from "react";
import { useSelector } from "react-redux";

import { selectUsers } from "@/store/user";

const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 22 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      offset: 7,
    },
    sm: {
      offset: 8,
    },
  },
};

interface UserScreenProps {
  onNextStep: () => void;
}

const UserScreen = ({ onNextStep }: PropsWithChildren<UserScreenProps>) => {
  const user = useSelector(selectUsers);
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);
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

  const handleValidateFields = async () => {
    try {
      await form.validateFields();
      setIsFormValid(false);
    } catch (error: any) {
      console.log("error", error);
      setIsFormValid(true);
    }
  };

  const handleFormValuesChange = () => {
    handleValidateFields();
  };

  return (
    <Row justify="center" gutter={[10, 12]}>
      <Col>
        <Form
          form={form}
          {...formItemLayout}
          name="userInfo"
          onFinish={onFinish}
          onValuesChange={handleFormValuesChange}
          initialValues={{
            prefix: "57",
          }}
          style={{ maxWidth: 600, padding: 20 }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="Correo electrónico"
            initialValue={user.email}
            labelCol={{ span: 24 }}
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
            initialValue={user.name}
            labelCol={{ span: 24 }}
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
            initialValue={user.email}
            labelCol={{ span: 24 }}
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
            initialValue={user.phone}
            labelCol={{ span: 24 }}
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" disabled={isFormValid}>
              Continuar
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default UserScreen;
