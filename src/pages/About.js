import React from "react";
import { Layout, Row, Col, Breadcrumb, Typography, Button } from "antd";
import { HomeOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../assets/style.css";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const About = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Content className="page-content" style={{ padding: "40px 20px" }}>
        <Breadcrumb style={{ marginBottom: 24 }}>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Giới thiệu</Breadcrumb.Item>
        </Breadcrumb>

        <Row gutter={[32, 32]} align="middle" className="about-container">
          {/* Bên trái: ảnh */}
          <Col xs={24} md={10}>
            <div
              style={{
                width: "100%",
                height: "300px",
                backgroundImage: `url('https://intphcm.com/data/upload/banner-thoi-trang4.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
          </Col>

          {/* Bên phải: nội dung */}
          <Col xs={24} md={14}>
            <div
              style={{
                backgroundColor: "#fff",
                padding: "24px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <Title level={2} style={{ color: "#1890ff" }}>
                Về chúng tôi
              </Title>
              <Paragraph>
                Chúng tôi là cửa hàng cung cấp các sản phẩm thời trang và thiết bị
                công nghệ chất lượng. Sứ mệnh của chúng tôi là mang đến trải
                nghiệm mua sắm dễ dàng, an toàn và đáng tin cậy cho mọi khách hàng.
              </Paragraph>

              <Paragraph>
                Với cam kết chất lượng và dịch vụ, chúng tôi lựa chọn đối tác uy
                tín, kiểm soát chặt chẽ quy trình và luôn sẵn sàng hỗ trợ khách
                hàng trong mọi tình huống.
              </Paragraph>

              <Button
                type="primary"
                size="large"
                icon={<ShoppingOutlined />}
                onClick={() => navigate("/products")}
              >
                Xem sản phẩm
              </Button>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default About;
