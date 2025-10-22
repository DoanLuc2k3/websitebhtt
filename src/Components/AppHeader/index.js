import {
  BellOutlined,
  MailOutlined,
  UserOutlined,
  EditOutlined,
  LogoutOutlined,
  SearchOutlined,
  BulbOutlined, // ✅ Thêm BulbOutlined cho Dark Mode
  SettingOutlined, // ✅ Thêm SettingOutlined cho Popover
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
  Popover, // ✅ Dùng Popover thay cho Dropdown
  Flex,
  AutoComplete,
} from "antd";
import { useEffect, useState } from "react";
// Đảm bảo bạn đã cài đặt react-router-dom: npm install react-router-dom
import { useNavigate } from "react-router-dom"; 

// =================================================================
// --- MOCK API DATA (Dữ liệu giả lập) ---
// =================================================================

const getComments = () => Promise.resolve({ comments: [{ body: "Sản phẩm A rất tốt!" }, { body: "Tôi cần hỗ trợ về đơn hàng B." }, {body: "Đơn hàng rất chi là đẹp."}] });
const getOrders = () => Promise.resolve({ products: [{ title: "Tai nghe X" }, { title: "Chuột không dây Y" }] });

// Dữ liệu giả định cho AutoComplete (Instant Search)
const mockSearchData = [
  { type: 'keyword', label: 'Áo', value: 'Áo', count: 120, },
  { type: 'product', label: 'Áo Guci', value: 'Áo Guci', price: '1.200.000 VNĐ', img: 'https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2025/10/ao-polo-nam-gucci-gg-horsebit-print-cotton-shirt-mau-kem-hoa-tiet-size-m-68f09bdcd6903-16102025141644.jpg', },
  { type: 'keyword', label: 'Túi xách nữ cao cấp', value: 'Túi xách nữ cao cấp', count: 45, },
  { type: 'product', label: 'Túi xách rách', value: 'Túi xách rách', price: '450.000 VNĐ', img: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTL5ZhH3_MIKtBqKLxMkXYyIrq5USZR5JO--tMllPP3FPIqkBazD7VYRS_zFr55d2koMQ2Ksjn_Qb2OB4WweThTgPrM0wPJrPJBFY5irjcXsOwQqLuhg3-xn7m0gK3ka4PhzopKisiONCgZ&usqp=CAc', },
];

// Hàm render item tùy chỉnh cho AutoComplete
const renderItem = (item) => {
    if (item.type === 'product') {
        return {
          value: item.value,
          label: (
            <Flex justify="space-between" align="center" style={{ padding: '4px 0' }}>
              <Flex gap={10} align="center">
                <Avatar size={40} src={item.img} />
                <div>
                  <Typography.Text strong>{item.label}</Typography.Text>
                  <Typography.Paragraph style={{ margin: 0, fontSize: 12, color: '#f00' }}>
                    {item.price}
                  </Typography.Paragraph>
                </div>
              </Flex>
              <SearchOutlined style={{ color: '#ccc' }} />
            </Flex>
          ),
        };
    }
    return {
        value: item.value,
        label: (
          <Flex justify="space-between" align="center" style={{ padding: '4px 0' }}>
            <Typography.Text>
              <SearchOutlined style={{ marginRight: 8, color: '#999' }} />
              {item.label}
            </Typography.Text>
            {item.count && (
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    ({item.count} kết quả)
                </Typography.Text>
            )}
          </Flex>
        ),
      };
};
const searchOptions = mockSearchData.map(renderItem);


// =================================================================
// --- MAIN COMPONENT: APPHEADER ---
// =================================================================

function AppHeader() {
  // --- STATE ---
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // ✅ State Dark Mode
  const navigate = useNavigate();

  const PRIMARY_COLOR = "#1677ff"; // Màu chủ đạo của Ant Design

  // --- EFFECTS ---
  // Lấy dữ liệu bình luận + đơn hàng
  useEffect(() => {
    getComments().then((res) => setComments(res.comments || []));
    getOrders().then((res) => setOrders(res.products || []));
  }, []);

  // --- HANDLERS ---
  const handleLogout = () => {
    localStorage.removeItem("adminLogin");
    message.success("Đã đăng xuất thành công!");
    setAdminOpen(false);
    navigate("/"); // Chuyển hướng về trang đăng nhập/trang chủ
  };
  
  const onSearch = (value) => {
    if (value) {
        message.info(`Đang tìm kiếm: "${value}"`);
        // Logic thực tế: navigate(`/search?query=${value}`);
    }
  };

  const handleToggleDarkMode = () => {
      setDarkMode(!darkMode);
      // Áp dụng logic thay đổi theme tại đây (ví dụ: đổi class body)
      message.info(`Chế độ ${!darkMode ? 'Tối' : 'Sáng'} đã được kích hoạt!`);
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

  // ✅ Nội dung Popover Admin
  const adminPopoverContent = (
    <div style={{ width: 250 }}>
        {/* Thông tin nhanh của Admin */}
        <Flex gap={10} align="center" style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0', marginBottom: 10 }}>
            <Avatar size={48} src="https://api.dicebear.com/7.x/adventurer/svg?seed=Admin" />
            <div>
                <Typography.Text strong>Doãn Bá Min</Typography.Text>
                <Typography.Paragraph type="secondary" style={{ margin: 0, fontSize: 12 }}>
                    admin@lmcompany.com
                </Typography.Paragraph>
            </div>
        </Flex>
        
        {/* Các lựa chọn */}
        <List size="small" style={{ cursor: 'pointer' }}>
            <List.Item onClick={() => { setAdminOpen(true); document.querySelector('.ant-popover').style.display = 'none'; }}>
                <UserOutlined style={{ marginRight: 8 }} />
                Thông tin cá nhân
            </List.Item>
            <List.Item>
                <SettingOutlined style={{ marginRight: 8 }} />
                Cài đặt hệ thống
            </List.Item>
            <List.Item onClick={handleLogout} style={{ color: "red" }}>
                <LogoutOutlined style={{ marginRight: 8 }} />
                Đăng xuất
            </List.Item>
        </List>
    </div>
  );

  return (
    <div
      className="AppHeader"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        padding: "10px 25px",
        // Chuyên nghiệp & Cố định: Shadow, không bo góc, sticky
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)", 
        borderRadius: 0, 
        position: "sticky", 
        top: 0, 
        zIndex: 1000, 
        transition: "all 0.3s ease",
      }}
    >
      {/* --- LOGO (Clickable để về Dashboard) --- */}
      <Flex align="center" gap={10} style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          <img
            src="https://i.imgur.com/sf3D9V9.png"
            alt="Logo"
            style={{ height: 48, objectFit: "contain", display: "block" }}
          />
        </Typography.Title>
      </Flex>

      {/* --- SEARCH (AutoComplete chuyên nghiệp) --- */}
      <AutoComplete
        dropdownMatchSelectWidth={500} 
        options={searchOptions} 
        style={{
          width: 450, 
          borderRadius: 8,
          transition: "all 0.3s",
        }}
        onSelect={onSearch} 
      >
        <Input
            prefix={<SearchOutlined style={{ color: '#aaa' }} />} 
            placeholder="Tìm kiếm sản phẩm, đơn hàng, khách hàng..."
            allowClear
            onPressEnter={(e) => onSearch(e.target.value)}
            style={{ borderRadius: 8, height: 40 }} // Tăng nhẹ chiều cao
        />
      </AutoComplete>
      {/* ------------------------------------------------------------- */}


      {/* --- ICONS + ADMIN --- */}
      <Space size={16}>
        
        {/* ✅ Nút Dark Mode/Light Mode */}
        <Button
            type="default"
            shape="circle"
            icon={<BulbOutlined style={{ fontSize: 20, color: darkMode ? PRIMARY_COLOR : '#555' }} />}
            onClick={handleToggleDarkMode}
            style={{ 
                backgroundColor: '#f5f5f5', 
                borderColor: 'transparent', 
                transition: 'all 0.3s' 
            }}
            onMouseEnter={(e) => handleIconHover(e, true)}
            onMouseLeave={(e) => handleIconHover(e, false, darkMode ? PRIMARY_COLOR : '#555')}
        />

        {/* Bình luận (Mail) */}
        <Badge count={comments.length} offset={[-2, 2]}>
          <Button
            type="default"
            shape="circle"
            icon={<MailOutlined style={{ fontSize: 20, color: '#555' }} />}
            onClick={() => setCommentsOpen(true)}
            style={{ 
                backgroundColor: '#f5f5f5', 
                borderColor: 'transparent', 
                transition: 'all 0.3s' 
            }}
            onMouseEnter={(e) => handleIconHover(e, true)}
            onMouseLeave={(e) => handleIconHover(e, false)}
          />
        </Badge>

        {/* Thông báo (Bell) */}
        <Badge count={orders.length} offset={[-2, 2]}>
          <Button
            type="default"
            shape="circle"
            icon={<BellOutlined style={{ fontSize: 20, color: '#555' }} />}
            onClick={() => setNotificationsOpen(true)}
            style={{ 
                backgroundColor: '#f5f5f5', 
                borderColor: 'transparent', 
                transition: 'all 0.3s' 
            }}
            onMouseEnter={(e) => handleIconHover(e, true)}
            onMouseLeave={(e) => handleIconHover(e, false)}
          />
        </Badge>

        {/* --- ADMIN POPULAR/SETTINGS (Sử dụng Popover) --- */}
        <Popover 
            placement="bottomRight" 
            content={adminPopoverContent} 
            trigger="click"
            overlayStyle={{ zIndex: 1001 }}
        >
            <Space
                style={{
                    cursor: "pointer",
                    padding: "4px 4px",
                    background: "#f5f7fa", 
                    borderRadius: 25,
                    transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#e6f4ff")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#f5f7fa")}
            >
                <Avatar
                    src="https://api.dicebear.com/7.x/adventurer/svg?seed=Admin"
                    size="large"
                    icon={<UserOutlined />}
                    style={{ marginRight: 0 }}
                />
            </Space>
        </Popover>
      </Space>

      {/* --- DRAWER COMMENTS & NOTIFICATIONS (Giữ nguyên) --- */}
      <Drawer
        title="📩 Bình luận mới"
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

      {/* --- MODAL ADMIN PROFILE (Giữ nguyên) --- */}
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