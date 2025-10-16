import React from "react";
import {
  Typography,
  Row,
  Col,
  Divider,
  Form,
  Input,
  Button,
  Card,
  message,
    Breadcrumb as BreakCrum,
} from "antd";

const {HomeOutlined, EnvironmentOutlined, PhoneOutlined, MailOutlined} = require("@ant-design/icons");
const { Title, Text } = Typography;


const Contact = () => {
  return (
    <>
    <div className="contact-banner">
      <div className="contact-banner-content">
        <Title level={2}>Liên hệ</Title>
        <BreakCrum>
          <BreakCrum.Item href="/">
          <HomeOutlined />
          <span>Trang chủ</span>
          </BreakCrum.Item>
          <BreakCrum.Item>Liên hệ</BreakCrum.Item>
        </BreakCrum>
      </div>  
    </div>
    <div className="contact-container" style={{marginTop:24}}>
        <Row gutter={[32, 32]} justify="center">
            <Col xs={24} sm={24} md={10}>
                <div className="contact-info">
                <div className="contact-info-item">
                    <EnvironmentOutlined className="info-icon"/>
                    <Text className="contact-info-title">Tòa nhà Lacasa, 266 Đội Cấn, phường Liễu Giai</Text>
                </div>
                <div className="contact-info-item">
                    <PhoneOutlined className="info-icon"/>
                    <Text className="contact-info-title">Điện thoại: 0123456789</Text>
                </div>
                <div className="contact-info-item">
                    <MailOutlined className="info-icon"/>
                    <Text className="contact-info-title">Email: contact@domain.com</Text>
                </div>
                <Divider />
                <Card className="contact-card">
                    <Title level={4}>Gửi tin nhắn cho chúng tôi</Title>
                    <Form className="form-contact">
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên của bạn' }]}>
                        <Input placeholder="Tên của bạn" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email của bạn' }]}>
                        <Input placeholder="Email của bạn" />
                    </Form.Item>
                    <Form.Item
                        name="message"
                        rules={[{ required: true, message: 'Vui lòng nhập tin nhắn của bạn' }]}>
                        <Input.TextArea rows={4} placeholder="Tin nhắn" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block style={{width: '30%', display: 'flex', margin: '0 auto'}}
                        onClick={() => message.success('Gửi tin nhắn thành công! Chúng tôi sẽ phản hồi sớm nhất có thể.')}>
                        Gửi tin nhắn
                        </Button>
                    </Form.Item>
                    </Form>
                </Card>
                </div>
            </Col>
            <Col xs={24} sm={24} md={10} style={{height:'100%'}}>
                <div className="map-container" style={{height:'100%'}}>
                    <iframe 
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.9315079324944!2d105.81296347596015!3d21.036952280613947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab1dbf34b2bb%3A0x4c3d2c6b5d6a10c3!2zMjY2IMSQ4buZaSBD4bqlbiwgTGl4YSBHaWFpLCBCw6AgxJDhuqFpLCBIw6AgTuG7mWkgMTAwMDA!5e0!3m2!1svi!2s!4v1695200100123!5m2!1svi!2s" 
                    loading="easy"
                    width="100%"
                    height="100%"
                    style={{border:0}}
                    allowFullScreen={""}
                    ></iframe>
                </div>
            </Col>
        </Row>
    </div>
    </>
    
    
    
  );
};

export default Contact;
