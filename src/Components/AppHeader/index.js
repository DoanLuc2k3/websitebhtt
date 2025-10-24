import {
    BellOutlined,
    MailOutlined,
    UserOutlined,
    EditOutlined,
    LogoutOutlined,
    SearchOutlined,
    BulbOutlined,
    SettingOutlined,
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
    Popover,
    Flex,
    AutoComplete,
    Switch,
    Divider,
    Select,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// =================================================================
// --- MOCK API DATA (Giữ nguyên) ---
// =================================================================

const getComments = () =>
    Promise.resolve({
        comments: [
            { body: "Sản phẩm A rất tốt!" },
            { body: "Tôi cần hỗ trợ về đơn hàng B." },
            { body: "Đơn hàng rất chi là đẹp." },
        ],
    });
const getOrders = () =>
    Promise.resolve({
        products: [{ title: "Tai nghe X" }, { title: "Chuột không dây Y" }],
    });

const mockSearchData = [
    { type: "keyword", label: "Áo", value: "Áo", count: 120 },
    {
        type: "product",
        label: "Áo Guci",
        value: "Áo Guci",
        price: "1.200.000 VNĐ",
        img: "https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2025/10/ao-polo-nam-gucci-gg-horsebit-print-cotton-shirt-mau-kem-hoa-tiet-size-m-68f09bdcd6903-16102025141644.jpg",
    },
    {
        type: "keyword",
        label: "Túi xách nữ cao cấp",
        value: "Túi xách nữ cao cấp",
        count: 45,
    },
    {
        type: "product",
        label: "Túi xách rách",
        value: "Túi xách rách",
        price: "450.000 VNĐ",
        img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTL5ZhH3_MIKtBqKLxMkXYyIrq5USZR5JO--tMllPP3FPIqkBazD7VYRS_zFr55d2koMQ2Ksjn_Qb2OB4WweThTgPrM0wPJrPJBFY5irjcXsOwQqLuhg3-xn7m0gK3ka4PhzopKisiONCgZ&usqp=CAc",
    },
];

const renderItem = (item) => {
    if (item.type === "product") {
        return {
            value: item.value,
            label: (
                <Flex justify="space-between" align="center" style={{ padding: "4px 0" }}>
                    <Flex gap={10} align="center">
                        <Avatar size={40} src={item.img} />
                        <div>
                            <Typography.Text strong>{item.label}</Typography.Text>
                            <Typography.Paragraph
                                style={{ margin: 0, fontSize: 12, color: "#f00" }}
                            >
                                {item.price}
                            </Typography.Paragraph>
                        </div>
                    </Flex>
                    <SearchOutlined style={{ color: "#ccc" }} />
                </Flex>
            ),
        };
    }
    return {
        value: item.value,
        label: (
            <Flex justify="space-between" align="center" style={{ padding: "4px 0" }}>
                <Typography.Text>
                    <SearchOutlined style={{ marginRight: 8, color: "#999" }} />
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
    const [comments, setComments] = useState([]);
    const [orders, setOrders] = useState([]);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [adminOpen, setAdminOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    
    // Logic cuộn đã được loại bỏ để Header cố định tuyệt đối

    const navigate = useNavigate();
    const PRIMARY_COLOR = "#1677ff";

    const [systemSettings, setSystemSettings] = useState({
        notifications: true,
        autoUpdate: false,
        language: "vi",
    });

    useEffect(() => {
        getComments().then((res) => setComments(res.comments || []));
        getOrders().then((res) => setOrders(res.products || []));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("adminLogin");
        message.success("Đã quay lại thành công!");
        setAdminOpen(false);
        navigate("/");
    };

    const onSearch = (value) => {
        if (value) {
            message.info(`Đang tìm kiếm: "${value}"`);
        }
    };

    const handleToggleDarkMode = () => {
        setDarkMode(!darkMode);
        message.info(`Chế độ ${!darkMode ? "Tối" : "Sáng"} đã được kích hoạt!`);
    };

    const handleIconHover = (e, isEntering, iconColor = "#555") => {
        const target = e.currentTarget;
        const icon = target.querySelector(".anticon");
        if (isEntering) {
            target.style.backgroundColor = PRIMARY_COLOR;
            if (icon) icon.style.color = "white";
        } else {
            target.style.backgroundColor = "#f5f5f5";
            if (icon) icon.style.color = iconColor;
        }
    };

    const adminPopoverContent = (
        <div style={{ width: 250 }}>
            <Flex
                gap={10}
                align="center"
                style={{
                    padding: "8px 0",
                    borderBottom: "1px solid #f0f0f0",
                    marginBottom: 10,
                }}
            >
                <Avatar size={48} src="https://api.dicebear.com/7.x/adventurer/svg?seed=Admin" />
                <div>
                    <Typography.Text strong>Doãn Bá Min</Typography.Text>
                    <Typography.Paragraph type="secondary" style={{ margin: 0, fontSize: 12 }}>
                        admin@lmcompany.com
                    </Typography.Paragraph>
                </div>
            </Flex>

            <List size="small" style={{ cursor: "pointer" }}>
                <List.Item onClick={() => setAdminOpen(true)}>
                    <UserOutlined style={{ marginRight: 8 }} /> Thông tin cá nhân
                </List.Item>
                <List.Item onClick={() => setSettingsOpen(true)}>
                    <SettingOutlined style={{ marginRight: 8 }} /> Cài đặt hệ thống
                </List.Item>
                <List.Item onClick={handleLogout} style={{ color: "red" }}>
                    <LogoutOutlined style={{ marginRight: 8 }} /> Đăng xuất
                </List.Item>
            </List>
        </div>
    );

    return (
        // Sử dụng class AppHeader (sticky) và header-visible (luôn hiển thị)
        <div
            className="AppHeader header-visible" 
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#fff",
                padding: "10px 25px",
            }}
        >
            {/* LOGO */}
            <Flex align="center" gap={10} style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
                <Typography.Title level={3} style={{ margin: 0 }}>
                    <img src="https://i.imgur.com/sf3D9V9.png" alt="Logo" style={{ height: 48, objectFit: "contain" }} />
                </Typography.Title>
            </Flex>

            {/* SEARCH */}
            <AutoComplete dropdownMatchSelectWidth={500} options={searchOptions} style={{ width: 450 }} onSelect={onSearch}>
                <Input
                    prefix={<SearchOutlined style={{ color: "#aaa" }} />}
                    placeholder="Tìm kiếm sản phẩm, đơn hàng, khách hàng..."
                    allowClear
                    onPressEnter={(e) => onSearch(e.target.value)}
                    style={{ borderRadius: 8, height: 40 }}
                />
            </AutoComplete>

            {/* ICONS */}
            <Space size={16}>
                <Button
                    type="default"
                    shape="circle"
                    icon={
                        <BulbOutlined
                            style={{
                                fontSize: 22,
                                color: "#FFD700",
                                filter: "drop-shadow(0 0 4px #FFD700)",
                            }}
                        />
                    }
                    onClick={handleToggleDarkMode}
                    style={{
                        backgroundColor: "#fff7e6",
                        borderColor: "transparent",
                        boxShadow: "0 0 6px rgba(255, 215, 0, 0.4)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fff1b8")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff7e6")}
                />

                <Badge count={comments.length}>
                    <Button
                        type="default"
                        shape="circle"
                        icon={<MailOutlined style={{ fontSize: 20, color: "#555" }} />}
                        onClick={() => setCommentsOpen(true)}
                        style={{ backgroundColor: "#f5f5f5", borderColor: "transparent" }}
                        onMouseEnter={(e) => handleIconHover(e, true)}
                        onMouseLeave={(e) => handleIconHover(e, false)}
                    />
                </Badge>

                <Badge count={orders.length}>
                    <Button
                        type="default"
                        shape="circle"
                        icon={<BellOutlined style={{ fontSize: 20, color: "#555" }} />}
                        onClick={() => setNotificationsOpen(true)}
                        style={{ backgroundColor: "#f5f5f5", borderColor: "transparent" }}
                        onMouseEnter={(e) => handleIconHover(e, true)}
                        onMouseLeave={(e) => handleIconHover(e, false)}
                    />
                </Badge>

                <Popover placement="bottomRight" content={adminPopoverContent} trigger="click">
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
                        />
                    </Space>
                </Popover>
            </Space>

            {/* DRAWER VÀ MODAL (Giữ nguyên) */}
            <Drawer title="📩 Bình luận mới" open={commentsOpen} onClose={() => setCommentsOpen(false)} maskClosable>
                <List dataSource={comments} renderItem={(item) => <List.Item>{item.body}</List.Item>} />
            </Drawer>
            <Drawer title="🔔 Thông báo đơn hàng" open={notificationsOpen} onClose={() => setNotificationsOpen(false)} maskClosable>
                <List
                    dataSource={orders}
                    renderItem={(item) => (
                        <List.Item>
                            <Typography.Text strong>{item.title}</Typography.Text> đã được đặt hàng!
                        </List.Item>
                    )}
                />
            </Drawer>
            {/* MODAL ADMIN PROFILE (Giữ nguyên) */}
            <Modal title="👨‍💼 Thông tin Quản trị viên" open={adminOpen} onCancel={() => setAdminOpen(false)} footer={null} centered>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <Avatar size={90} src="https://api.dicebear.com/7.x/adventurer/svg?seed=Admin" />
                    <Typography.Title level={4} style={{ marginTop: 10 }}>
                        Doãn Bá Min
                    </Typography.Title>
                    <Typography.Text type="secondary">Quản trị hệ thống</Typography.Text>
                </div>
                <Form layout="vertical">
                    <Form.Item label="Tên đăng nhập"><Input value="admin_lm" disabled /></Form.Item>
                    <Form.Item label="Email"><Input value="admin@lmcompany.com" /></Form.Item>
                    <Form.Item label="Số điện thoại"><Input value="0909 999 999" /></Form.Item>
                    <Form.Item label="Chức vụ"><Input value="System Administrator" disabled /></Form.Item>
                    <Space style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button type="primary" icon={<EditOutlined />}>Cập nhật thông tin</Button>
                        <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>Quay lại</Button>
                    </Space>
                </Form>
            </Modal>
            {/* MODAL SYSTEM SETTINGS (Giữ nguyên) */}
            <Modal
                title="⚙️ Cài đặt hệ thống"
                open={settingsOpen}
                onCancel={() => setSettingsOpen(false)}
                footer={[
                    <Button key="cancel" onClick={() => setSettingsOpen(false)}>Hủy</Button>,
                    <Button key="save" type="primary" onClick={() => { message.success("Lưu cài đặt thành công!"); setSettingsOpen(false); }}>Lưu thay đổi</Button>,
                ]}
                centered
            >
                <Form layout="vertical">
                    <Form.Item label="Chế độ thông báo"><Switch checked={systemSettings.notifications} onChange={(checked) => setSystemSettings({ ...systemSettings, notifications: checked })} checkedChildren="Bật" unCheckedChildren="Tắt" /></Form.Item>
                    <Form.Item label="Cập nhật tự động"><Switch checked={systemSettings.autoUpdate} onChange={(checked) => setSystemSettings({ ...systemSettings, autoUpdate: checked })} checkedChildren="Bật" unCheckedChildren="Tắt" /></Form.Item>
                    <Form.Item label="Ngôn ngữ hiển thị">
                        <Select
                            value={systemSettings.language}
                            onChange={(value) => setSystemSettings({ ...systemSettings, language: value })}
                            options={[
                                { label: "Tiếng Việt", value: "vi" },
                                { label: "English", value: "en" },
                                { label: "日本語", value: "jp" },
                            ]}
                        />
                    </Form.Item>
                    <Divider />
                    <Form.Item label="Giao diện">
                        <Button
                            type={darkMode ? "default" : "primary"}
                            icon={<BulbOutlined />}
                            onClick={handleToggleDarkMode}
                            style={{
                                width: "100%",
                                background: darkMode ? "#333" : "#fff",
                                color: darkMode ? "#fff" : "#000",
                            }}
                        >
                            {darkMode ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AppHeader;