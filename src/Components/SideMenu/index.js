import {
  AppstoreOutlined,
  QuestionCircleOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Tổng quan",
            icon: <AppstoreOutlined style={{color: "green"}} />,
            key: "/",
          },
         
          {
    label: "Quản lý kho",
    key: "/inventory",
    icon: <ShopOutlined style={{ color: "#fa8c16" }} />, // Cam
  },
          {
            label: "Đơn hàng",
            key: "/orders",
            icon: <ShoppingCartOutlined style={{color: "red"}}/>,
          },
            {
           label: "Nhân viên",
  key: "/staffs",
  // ✅ Sử dụng TeamOutlined với màu sắc tùy chỉnh
  icon: <TeamOutlined style={{ color: "Teal" }} />,
          },
          {
            label: "Khách hàng",
            key: "/customers",
            icon: <UserOutlined style={{color : "black"}}/>,
          },
          {
            label: "Hỗ trợ",
            key: "/help",
            icon: <QuestionCircleOutlined style={{color: "blue"}}/>,
            style: { marginTop: 'autp' } 
          },
         
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
