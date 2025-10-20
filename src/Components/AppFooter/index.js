import { Typography, Space } from "antd";
import {
  ShopOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import React from "react";

function AppFooter() {
  const FooterItem = ({ href, icon, text, color, bgColor, isBrand }) => (
    <Typography.Link
      href={href}
      target="_blank"
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 16px",
        borderRadius: 12,
        backgroundColor: bgColor,
        transition: "all 0.3s ease",
        textDecoration: "none",
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      }}
    >
      <span
        style={{
          color: color,
          fontSize: "18px",
          marginRight: "8px",
          fontWeight: 600,
        }}
      >
        {icon}
      </span>
      <Typography.Text
        style={{
          color: isBrand ? color : "#333",
          fontWeight: isBrand ? 700 : 500,
          fontSize: "15px",
        }}
      >
        {text}
      </Typography.Text>
    </Typography.Link>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px 24px",
        background: "#ffffff",
        boxShadow: "0 -4px 10px rgba(0,0,0,0.05)",
        borderTop: "1px solid #e8e8e8",
        fontFamily: "Inter, sans-serif",
        position: "relative",
      }}
    >
      
      <Space size="large">
        <FooterItem
          href="https://www.google.com"
          icon={<ShopOutlined />}
          text="L-M Shop"
          color="#1677ff"
          bgColor="#f0f5ff"
          isBrand={true}
        />
        <FooterItem
          href="tel:+123456789"
          icon={<PhoneOutlined />}
          text="+123456789"
          color="#00b96b"
          bgColor="#e6fffb"
        />
        <FooterItem
          href="https://www.google.com/maps"
          icon={<EnvironmentOutlined />}
          text="186 Nguyen Huu Tho"
          color="#fa8c16"
          bgColor="#fff7e6"
        />
      </Space>

      
      <div
        style={{
          position: "absolute",
          right: "24px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Typography.Text strong style={{ color: "#52c41a" }}>
          <CheckCircleOutlined />
        </Typography.Text>
        <Typography.Text strong style={{ color: "#555" }}>
          Hệ thống hoạt động
        </Typography.Text>
      </div>
    </div>
  );
}

export default AppFooter;
