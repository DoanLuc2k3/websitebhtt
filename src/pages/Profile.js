// src/pages/Profile.js
import React from 'react';
import { Row, Col, Card, Avatar, Typography, Button, Form, Input } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Profile = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Thông tin cập nhật:', values);
  };

  return (
    <div className="profile-page">
      <Row gutter={[32, 32]} justify="center">
        {/* Cột trái - Thông tin người dùng */}
        <Col xs={24} md={8}>
          <Card bordered className="profile-card">
            <Avatar size={120} icon={<UserOutlined />} style={{ marginBottom: 16 }} />
            <Title level={3}>Nguyễn Văn A</Title>
            <Paragraph>Email: nguyenvana@gmail.com</Paragraph>
            <Paragraph>Số điện thoại: 0123 456 789</Paragraph>
            <Button type="primary" icon={<EditOutlined />}>
              Chỉnh sửa
            </Button>
          </Card>
        </Col>

        {/* Cột phải - Form cập nhật */}
        <Col xs={24} md={12}>
          <Card title="Cập nhật thông tin">
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item name="name" label="Họ và tên" initialValue="Nguyễn Văn A">
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
              <Form.Item name="email" label="Email" initialValue="nguyenvana@gmail.com">
                <Input placeholder="Nhập email" />
              </Form.Item>
              <Form.Item name="phone" label="Số điện thoại" initialValue="0123456789">
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Lưu thay đổi
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
