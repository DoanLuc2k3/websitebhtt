import React from "react";
import {
  Layout,
  Typography,
  Space,
  Divider,
  Input,
  Row,
  Col,
  Card,
  Button,
} from "antd";
import { SearchOutlined, RocketOutlined, StarOutlined, HeartOutlined } from "@ant-design/icons";
import ProductsList from "./ProductsList";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const features = [
  {
    title: "Giao hàng nhanh",
    desc: "Giao hàng trong vòng 24 giờ với nhiều tùy chọn vận chuyển",
    icon: <RocketOutlined style={{ fontSize: 24, color: '#1890ff' }} />,
  },
  {
    title: "Sản phẩm chất lượng",
    desc: "Các sản phẩm được tuyển chọn cẩn thận từ nhà cung cấp uy tín",
    icon: <StarOutlined style={{ fontSize: 24, color: '#faad14' }} />,
  },
  {
    title: "Hỗ trợ 24/7",
    desc: "Đội ngũ chăm sóc khách hàng sẵn sàng giúp đỡ bạn",
    icon: <HeartOutlined style={{ fontSize: 24, color: '#eb2f96' }} />,
  },
];

const Home = () => {
  return (
    <Layout>
      <Content style={{ padding: "24px 48px" }}>
        {/* Hero */}
        <div
          style={{
            background: 'linear-gradient(90deg,#f0f5ff 0%, #ffffff 100%)',
            borderRadius: 8,
            padding: 32,
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, minWidth: 260 }}>
            <Title level={2} style={{ marginBottom: 8 }}>
              Chào mừng đến với cửa hàng của chúng tôi
            </Title>
            <Paragraph style={{ marginBottom: 16 }}>
              Khám phá sản phẩm mới nhất, nhận ưu đãi và trải nghiệm mua sắm
              dễ dàng. Bắt đầu với tìm kiếm nhanh bên dưới.
            </Paragraph>

            <Space style={{ width: '100%' }}>
              <Input
                placeholder="Tìm kiếm sản phẩm, ví dụ: điện thoại, áo khoác..."
                prefix={<SearchOutlined />}
                style={{ maxWidth: 480 }}
                allowClear
              />
              <Button type="primary">Tìm kiếm</Button>
            </Space>
          </div>

          <div style={{ minWidth: 200 }}>
            <img
              src="/assets/hero.png"
              alt="hero"
              style={{ maxWidth: 260, width: '100%', borderRadius: 8 }}
              onError={(e) => {
                // fallback if image not found
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Feature cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          {features.map((f) => (
            <Col xs={24} sm={8} key={f.title} >
              <Card hoverable style={{ minHeight: 150 }}>
                <Space align="start">
                  <div>{f.icon}</div>
                  <div>
                    <Title level={5} style={{ margin: 0 }}>
                      {f.title}
                    </Title>
                    <Paragraph style={{ margin: 0 }}>{f.desc}</Paragraph>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        <Divider />

        {/* CTA */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={3} style={{ marginBottom: 12 }}>
            Sẵn sàng để mua sắm?
          </Title>
          <Button type="primary" size="large" href="/products">
            Xem tất cả sản phẩm
          </Button>
        </div>

        {/* Danh sách sản phẩm */}
        <ProductsList />
      </Content>
    </Layout>
  );
};

export default Home;
