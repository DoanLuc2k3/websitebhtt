import { Card, Typography, Form, Input, Button, Row, Col } from "antd";
import {
  GoogleOutlined,
  LoginOutlined,
  FacebookFilled,
} from "@ant-design/icons";
const { Title, Text, Link } = Typography;
const Register = () => {
  return (
    <div className="login-page">
      <Card className="login-card">
        <Title className="login-title" level={2}>
          Đăng ký
        </Title>
        <Form className="form-login">
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
          >
            <Input placeholder="Tên đăng nhập" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu nhập lại không khớp")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              <LoginOutlined />
              Đăng ký
            </Button>
          </Form.Item>
          <Form.Item>
            <Text className="or-login">Hoặc đăng nhập với</Text>
          </Form.Item>
          <Row className="login-with" justify="center" gutter={16}>
            <Col>
              <Button className="btn-login-google">
                <GoogleOutlined />
                Google
              </Button>
            </Col>
            <Col>
              <Button className="btn-login-facebook">
                <FacebookFilled />
                Facebook
              </Button>
            </Col>
          </Row>
          <Form.Item>
            <Text className="dont-have-account">
              Đã có tài khoản? <Link href="/login">Đăng nhập ngay</Link>
            </Text>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Register;
