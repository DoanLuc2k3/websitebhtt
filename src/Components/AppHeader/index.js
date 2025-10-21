import {
  BellOutlined, 
  MailOutlined, // ✅ Đảm bảo MailOutlined đã được import
  UserOutlined,
  EditOutlined,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Drawer,
  List,
  Space,
  Typography,
  Input,
  Button,
  Avatar,
  Form,
  Modal,
  message,
  Dropdown,
  Flex,
} from "antd";
import { useEffect, useState } from "react";
import { getComments, getOrders } from "../../API";
import { useNavigate } from "react-router-dom";

function AppHeader() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const navigate = useNavigate();

  // Màu sắc chủ đạo (Giả định)
  const PRIMARY_COLOR = "#1677ff"; 

  // Lấy dữ liệu bình luận + đơn hàng
  useEffect(() => {
    getComments().then((res) => setComments(res.comments || []));
    getOrders().then((res) => setOrders(res.products || []));
  }, []);

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("adminLogin");
    message.success("Đăng xuất thành công!");
    setAdminOpen(false);
    navigate("/");
  };

  // Menu dropdown của Admin (Giữ nguyên)
  const adminMenu = {
    items: [
      {
        key: "1",
        label: (
          <span onClick={() => setAdminOpen(true)}>
            <UserOutlined style={{ marginRight: 8 }} />
            Thông tin quản trị viên
          </span>
        ),
      },
      {
        key: "2",
        label: (
          <span onClick={handleLogout} style={{ color: "red" }}>
            <LogoutOutlined style={{ marginRight: 8 }} />
            Đăng xuất
          </span>
        ),
      },
    ],
  };
  
  // Hàm xử lý Hover cho Button Icon
  const handleIconHover = (e, isEntering, iconColor = '#555') => {
      const target = e.currentTarget;
      const icon = target.querySelector('.anticon');
      
      if (isEntering) {
          target.style.backgroundColor = PRIMARY_COLOR;
          if (icon) icon.style.color = 'white';
      } else {
          target.style.backgroundColor = '#f5f5f5';
          if (icon) icon.style.color = iconColor;
      }
  };

  return (
    <div
      className="AppHeader"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        padding: "10px 25px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        borderRadius: 8,
      }}
    >
      {/* --- LOGO --- (Giữ nguyên) */}
      <Flex align="center" gap={10}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          <img
            src="https://i.imgur.com/sf3D9V9.png"
            alt="Logo"
            style={{ height: 48, objectFit: "contain", display: "block" }}
          />
        </Typography.Title>
      </Flex>

      {/* --- SEARCH --- (Giữ nguyên) */}
      <Input
        placeholder="Tìm kiếm sản phẩm..."
        style={{ width: 320, borderRadius: 20, background: "#f9fafc" }}
        prefix={<SearchOutlined style={{ color: '#999' }} />}
        allowClear
      />

      {/* --- ICONS + ADMIN --- */}
      <Space size={16}>
        
        {/* Bình luận (Mail) */}
        <Badge count={comments.length} offset={[-2, 2]}> {/* ✅ Đã xóa dot */}
          <Button
            type="default"
            shape="circle"
            icon={<MailOutlined style={{ fontSize: 20, color: '#555' }} />}
            onClick={() => setCommentsOpen(true)}
            style={{ backgroundColor: '#f5f5f5', borderColor: 'transparent', transition: 'all 0.3s' }}
            onMouseEnter={(e) => handleIconHover(e, true)}
            onMouseLeave={(e) => handleIconHover(e, false)}
          />
        </Badge>

        {/* Thông báo (Bell) */}
        <Badge count={orders.length} offset={[-2, 2]}> {/* ✅ Đã xóa dot */}
          <Button
            type="default"
            shape="circle"
            icon={<BellOutlined style={{ fontSize: 20, color: '#555' }} />}
            onClick={() => setNotificationsOpen(true)}
            style={{ backgroundColor: '#f5f5f5', borderColor: 'transparent', transition: 'all 0.3s' }}
            onMouseEnter={(e) => handleIconHover(e, true)}
            onMouseLeave={(e) => handleIconHover(e, false)}
          />
        </Badge>

        {/* --- ADMIN MENU --- (Giữ nguyên) */}
        <Dropdown menu={adminMenu} placement="bottomRight" arrow>
          <Space
            style={{
              cursor: "pointer",
              background: "#f5f7fa",
              borderRadius: 25,
              padding: "4px 4px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e6f4ff")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#f5f7fa")}
          >
            <Avatar
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Admin"
              size="default"
              icon={<UserOutlined />}
              style={{ marginRight: 0 }}
            />
          </Space>
        </Dropdown>
      </Space>

      {/* --- DRAWER COMMENTS & NOTIFICATIONS --- (Giữ nguyên) */}
      <Drawer
        title="💬 Bình luận mới"
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => <List.Item>{item.body}</List.Item>}
        />
      </Drawer>

      <Drawer
        title="🔔 Thông báo đơn hàng"
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        maskClosable
      >
        <List
          dataSource={orders}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text strong>{item.title}</Typography.Text> đã được đặt
              hàng!
            </List.Item>
          )}
        />
      </Drawer>

      {/* --- MODAL ADMIN PROFILE --- (Giữ nguyên) */}
      <Modal
        title="👨‍💼 Thông tin Quản trị viên"
        open={adminOpen}
        onCancel={() => setAdminOpen(false)}
        footer={null}
        centered
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Avatar
            size={90}
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Admin"
          />
          <Typography.Title level={4} style={{ marginTop: 10 }}>
            Doãn Bá Min
          </Typography.Title>
          <Typography.Text type="secondary">
            Quản trị hệ thống
          </Typography.Text>
        </div>

        <Form layout="vertical">
          <Form.Item label="Tên đăng nhập">
            <Input value="admin_lm" disabled />
          </Form.Item>
          <Form.Item label="Email">
            <Input value="admin@lmcompany.com" />
          </Form.Item>
          <Form.Item label="Số điện thoại">
            <Input value="0909 999 999" />
          </Form.Item>
          <Form.Item label="Chức vụ">
            <Input value="System Administrator" disabled />
          </Form.Item>

          <Space style={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="primary" icon={<EditOutlined />}>
              Cập nhật thông tin
            </Button>
            <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
              Quay lại
            </Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
}

export default AppHeader;