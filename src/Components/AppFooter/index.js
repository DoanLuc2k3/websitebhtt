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
                // Giữ padding gọn
                padding: "6px 10px", 
                borderRadius: 10, // Giảm bo tròn nhẹ
                backgroundColor: bgColor,
                transition: "all 0.3s ease",
                textDecoration: "none",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)", // Bóng nhẹ hơn
                flexShrink: 0,
            }}
        >
            <span
                style={{
                    color: color,
                    fontSize: "16px", // Giảm kích thước icon
                    marginRight: "6px",
                    fontWeight: 600,
                }}
            >
                {icon}
            </span>
            <Typography.Text
                style={{
                    color: isBrand ? color : "#333",
                    fontWeight: isBrand ? 700 : 500,
                    fontSize: "14px", // Giảm kích thước chữ
                }}
            >
                {text}
            </Typography.Text>
        </Typography.Link>
    );

    return (
        <div
            className="AppFooter" 
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Inter, sans-serif",
                
                // NÂNG CẤP THẨM MỸ: Glassmorphism Effect
                background: "rgba(255, 255, 255, 0.95)", // Hơi trong suốt
                backdropFilter: 'blur(5px)', 
                
                // Cần đảm bảo padding đủ để Footer Item hiển thị
                padding: "8px 24px", 
            }}
        >
            
            {/* Giảm size space cho Footer Item */}
            <Space size="middle"> 
                <FooterItem
                    href="https://www.google.com"
                    icon={<ShopOutlined />}
                    text="L-M Shop"
                    color="#1677ff"
                    bgColor="#e6f4ff" // Màu nền nhạt hơn
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

            
            {/* Khối trạng thái hệ thống */}
            <div
                style={{
                    position: "absolute",
                    /* ✅ SỬA: Chuyển sang left để tránh bị Side Menu che trên màn hình nhỏ */
                    left: "24px", 
                    right: "auto", 
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    zIndex: 1001,
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
