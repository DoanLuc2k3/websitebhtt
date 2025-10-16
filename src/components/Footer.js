import React from 'react';
import "../assets/style.css"; // ✅ import CSS riêng
import { Layout, Row, Col, Typography, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter = () => {
  const navigate = useNavigate();
  return (
    <Footer className='app-footer'>
        <Row gutter={[32, 32]} justify="center" >
            <Col xs={24} sm={12} md={8}>
                <Space direction='vertical' size="small">
                    <Title level={4} className='footer-title'>MyShop</Title>
                    <Text className='footer-text'>Nền tảng mua sắm tiện lợi, nhanh chóng và uy tín. Luôn mang đến
              trải nghiệm tốt nhất cho khách hàng.</Text>
                </Space>
            </Col>
            <Col xs={24} sm={12} md={8}>
                <Space direction='vertical' size="small">
                    <Title level={5} className='footer-title'>Liên kết nhanh</Title>
                    <Text className='footer-link' onClick={() => navigate('/')}>Trang chủ</Text>
                    <Text className='footer-link' onClick={() => navigate('/products')}>Sản phẩm</Text>
                    <Text className='footer-link' onClick={() => navigate('/about')}>Giới thiệu</Text>
                    <Text className='footer-link' onClick={() => navigate('/contact')}>Liên hệ</Text>
                </Space>
            </Col>
            
            <Col xs={24} sm={12} md={8}>
                <Space direction='vertical' size='small'>
                    <Title level={5} className='footer-title'>Liên hệ</Title>
                    <Text className='footer-text'>Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</Text>
                    <Text className='footer-text'>Email: contact@myshop.com</Text>
                </Space>
            </Col>
        </Row>
        <div className='footer-bottom'>
            <Text type='secondary'>© 2023 MyShop. All rights reserved.</Text>
        </div>
    </Footer>
  );

};

export default AppFooter;
