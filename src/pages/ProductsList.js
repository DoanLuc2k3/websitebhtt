import React from 'react';
import {Row, Col, Typography, Card, Button} from 'antd';
import { useLocation } from 'react-router-dom';

const {Title, Text} = Typography;
const products = [
    {
    id: 1,
    name: "Điện thoại iPhone 15",
    description: "Smartphone cao cấp với camera chất lượng",
    price: "25,000,000₫",
    image: "https://lados.vn/wp-content/uploads/2024/09/z4963812344350_f8f0f67dff98e701aa1ccefb3fa339f1.jpg", // placeholder ảnh
  },
  {
    id: 2,
    name: "Laptop Dell XPS 13",
    description: "Laptop mỏng nhẹ, hiệu năng cao",
    price: "30,000,000₫",
    image: "https://lados.vn/wp-content/uploads/2024/09/z4963812344350_f8f0f67dff98e701aa1ccefb3fa339f1.jpg",
  },
  {
    id: 3,
    name: "Tai nghe AirPods Pro",
    description: "Tai nghe không dây, chống ồn chủ động",
    price: "6,000,000₫",
    image: "https://lados.vn/wp-content/uploads/2024/09/z4963812344350_f8f0f67dff98e701aa1ccefb3fa339f1.jpg",
  },
];

const ProductsList = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const q = params.get('q') ? params.get('q').toLowerCase() : '';

  const filtered = q
    ? products.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    : products;

  return (
    <div>
        <Title level={2} style={{marginBottom:24}}>
        Danh sách sản phẩm
        </Title>
        <Row gutter={[24, 24]}>
        {filtered.map(product => (
            <Col key={product.id} xs={24} sm={12} md={8}>
            <Card
                hoverable
                cover={<img alt={product.name} src={product.image} />}
                actions={[
                    <Button  type="primary" block>Thêm vào giỏ hàng</Button>
                ]}
                >
                <Card.Meta
                title={product.name}
                description={
                    <>
                    <Text>{product.description}</Text>
                    <br />
                    <Text strong >{product.price}</Text>
                </>
                }
                />
            </Card>
            </Col>
        ))}
        </Row>
    </div>
  );
};
export default ProductsList;