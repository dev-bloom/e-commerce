import { Button, Form, Row, Col, Input, Select } from "antd";
import type { PropsWithChildren } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectUser, setUser } from "@/store/user";

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
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Select.Option value="57">+57</Select.Option>
      </Select>
    </Form.Item>
  );

  const onFinish = (values: any) => {
    dispatch(setUser(values));
    onNextStep();
  };

  const validateFields = () => {
    form.validateFields();
  };

  return (
    <Row justify="center" gutter={[10, 12]}>
      <Col>
        <Form
          form={form}
          wrapperCol={{ span: 22 }}
          name="userInfo"
          onFinish={onFinish}
          onSubmitCapture={validateFields}
          initialValues={{
            prefix: "57",
          }}
          style={{ maxWidth: 600, padding: 20 }}
          scrollToFirstError
        >
          <Row>
            <Col xs={24} sm={12}>
              <Form.Item
                name="name"
                label="Nombres"
                initialValue={user.name}
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa tu nombre!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Correo electrónico"
                initialValue={user.email}
                labelCol={{ span: 24 }}
                rules={[
                  {
                    type: "email",
                    message: "Por favor ingresa un E-mail válido",
                  },
                  {
                    required: true,
                    message: "Por favor ingresa tu E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="city"
                label="Ciudad"
                initialValue={user.city}
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa tu ciudad!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="postalCode"
                label="Código postal"
                initialValue={user.postalCode}
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa tu código postal!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="surname"
                label="Apellidos"
                initialValue={user.surname}
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa tus apellidos!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="address"
                label="Dirección"
                initialValue={user.address}
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa tu dirección!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="deparment"
                label="Departamento"
                initialValue={user.deparment}
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa tu Departamento!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Teléfono de contacto"
                initialValue={user.phone}
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa tu telefono!",
                  },
                ]}
              >
                <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Form.Item
              label="Comentarios"
              labelCol={{ span: 24 }}
              name="comentarios"
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Row>

          <Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
              }}
            >
              <Button type="primary" htmlType="submit">
                Continuar
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default UserScreen;
