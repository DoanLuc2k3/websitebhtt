import {
  BellFilled,
  MailOutlined,
  UserOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Drawer,
  Image,
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

  useEffect(() => {
    getComments().then((res) => setComments(res.comments));
    getOrders().then((res) => setOrders(res.products));
  }, []);

  // ✅ Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("adminLogin");
    message.success("Quay lại thành công!");
    setAdminOpen(false);
    navigate("/");
  };

  // ✅ Menu dropdown của Admin
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
      {/* --- LOGO + TITLE --- */}
      <Flex align="center" gap={10}>
        <Image width={40} src="https://i.imgur.com/AUPzhaY.png" preview={false} />
        <Typography.Title level={3} style={{ margin: 0 }}>
          <span className="logo-title" style={{ color: "#1677ff" }}>
            L-M Dashboard
          </span>
        </Typography.Title>
      </Flex>

      {/* --- SEARCH --- */}
      <Input.Search
        placeholder="Tìm kiếm..."
        style={{
          width: 360,
          borderRadius: 20,
          background: "#f9fafc",
          border: "1px solid #d9d9d9",
        }}
      />

      {/* --- ICONS + ADMIN --- */}
      <Space size={20}>
        <Badge count={comments.length} dot>
          <MailOutlined
            style={{ fontSize: 22, cursor: "pointer" }}
            onClick={() => setCommentsOpen(true)}
          />
        </Badge>
        <Badge count={orders.length} dot>
          <BellFilled
            style={{ fontSize: 22, cursor: "pointer" }}
            onClick={() => setNotificationsOpen(true)}
          />
        </Badge>

        {/* --- ADMIN MENU --- */}
        <Dropdown menu={adminMenu} placement="bottomRight" arrow>
          <Space
            style={{
              cursor: "pointer",
              background: "#f5f7fa",
              borderRadius: 25,
              padding: "6px 12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e6f4ff")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#f5f7fa")}
          >
            <Avatar
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Admin"
              size="small"
              icon={<UserOutlined />}
            />
            <Typography.Text strong style={{ color: "#333" }}>
              Admin
            </Typography.Text>
          </Space>
        </Dropdown>
      </Space>

      {/* --- DRAWER COMMENTS --- */}
      <Drawer
        title="Bình luận mới"
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => <List.Item>{item.body}</List.Item>}
        />
      </Drawer>

      {/* --- DRAWER NOTIFICATIONS --- */}
      <Drawer
        title="Thông báo đơn hàng"
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        maskClosable
      >
        <List
          dataSource={orders}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text strong>{item.title}</Typography.Text> đã được đặt hàng!
            </List.Item>
          )}
        />
      </Drawer>

      {/* --- MODAL ADMIN PROFILE --- */}
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
          <Typography.Text type="secondary">Quản trị hệ thống</Typography.Text>
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
