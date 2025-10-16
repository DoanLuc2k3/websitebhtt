import React, { useState } from "react";
import {Layout,Menu,Avatar,Dropdown,Space,Button,Typography, Input } from "antd";
import { UserOutlined, DownOutlined, LoginOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from '../assets/images/logo.jpg';
const { Header } = Layout;
const { Title } = Typography;
 

const AppHeader = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const menuItems = [
    { key: "home", label: "Trang chủ", onClick: () => navigate("/") },
    { key: "product", label: "Sản phẩm", onClick: () => navigate("/products") },
    { key: "about", label: "Giới thiệu", onClick: () => navigate("/about") },
    { key: "contact", label: "Liên hệ", onClick: () => navigate("/contact") },
  ];
  const userMenu = {
    items: [
      { key: "1", label: "Hồ sơ", onClick: () => navigate("/profile") },
      { key: "2", label: "Đăng xuất" },
    ],
  };
  return (
    <Header
      style={{ 
        display: "flex", 
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        padding: "0 24px",
        boxShadow: "0 2px 8px #f0f1f2",
      }}
    >
      <Space>
        <img
          src={logo}
          alt="Logo"
          style={{ width: 32, height: 32 }}
        /> 
        <Title level={4} style={{ margin: 0 }}>
          Myshop
        </Title>
      </Space>
      <Menu
        mode="horizontal"
        items={menuItems}
        style={{ flex: 1, justifyContent: "center", borderBottom: "none" }}
      />
      <Space>
        <Dropdown menu={userMenu} trigger={["click"]}>
          <Space style={{ cursor: "pointer" }}>
            <Avatar icon={<UserOutlined />} />
            <DownOutlined />
          </Space>
        </Dropdown>
        <Input
          placeholder="Tìm sản phẩm..."
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onPressEnter={() => navigate(`/products?q=${encodeURIComponent(search)}`)}
          style={{ width: 220, marginRight: 8 }}
          allowClear
        />
        <Button onClick={() => navigate("/login")} type="primary" icon={<LoginOutlined />}>
          Đăng nhập
        </Button>
      </Space>
    </Header>
  );
};
export default AppHeader;
