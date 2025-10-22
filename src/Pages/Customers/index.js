import React, { useEffect, useState } from "react";

import {
    UserOutlined,
    SearchOutlined,
    EnvironmentOutlined,
    UserAddOutlined,
    PhoneOutlined,
    EditOutlined, 
    HistoryOutlined, 
} from "@ant-design/icons";
import {
    Avatar,
    Space,
    Table,
    Typography,
    Card,
    Tag,
    Input,
    Select,
    Badge,
    Flex,
    Button,
    Tooltip,
    Modal,      // ✅ Thêm Modal
    Form,       // ✅ Thêm Form
    message,    // ✅ Thêm message
} from "antd";
// Giả lập hàm API
const getCustomers = () => Promise.resolve({
    users: [
        { id: 1, firstName: "Doãn", lastName: "Min", email: "doanmin@example.com", phone: "+123456789", image: "https://i.pravatar.cc/150?img=1", address: { city: "Đà Nẵng" } },
        { id: 2, firstName: "Doãn", lastName: "Lực", email: "doanluc@example.com", phone: "+987654321", image: "https://i.pravatar.cc/150?img=2", address: { city: "Đà Nẵng" } },
        { id: 3, firstName: "Lê", lastName: "Văn C", email: "levanc@example.com", phone: "+112233445", image: "https://i.pravatar.cc/150?img=3", address: { city: "Hồ Chí Minh" } },
        { id: 4, firstName: "Phạm", lastName: "Thị D", email: "phamd@example.com", phone: "+556677889", image: "https://i.pravatar.cc/150?img=4", address: { city: "Hà Nội" } },
        { id: 5, firstName: "Hoàng", lastName: "Văn E", email: "hoange@example.com", phone: "+998877665", image: "https://i.pravatar.cc/150?img=5", address: { city: "Hải Phòng" } },
    ]
});


const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

function Customers() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [selectedCity, setSelectedCity] = useState("Tất cả");
    
    // ✅ State và Form Instance cho Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();


    // --- LOAD DATA ---
    useEffect(() => {
        setLoading(true);
        getCustomers().then((res) => {
            const usersData = (res.users || []).map((user, index) => ({
                ...user,
                totalOrders: Math.floor(Math.random() * 50),
                joinDate: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN'),
                key: user.id // Thêm key
            }));
            setDataSource(usersData);
            setFilteredData(usersData);
            setLoading(false);
        });
    }, []);

    // --- FILTER LOGIC ---
    useEffect(() => {
        let filtered = dataSource.filter((item) => {
            const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
            const matchesSearch = fullName.includes(searchValue.toLowerCase());
            const matchesCity =
                selectedCity === "Tất cả" || item.address.city === selectedCity;
            return matchesSearch && matchesCity;
        });
        setFilteredData(filtered);
    }, [searchValue, selectedCity, dataSource]);

    // --- CITIES FILTER OPTIONS ---
    const cities = [
        "Tất cả",
        ...new Set(dataSource.map((item) => item.address.city)),
    ];

    // Hàm tạo trạng thái hoạt động ngẫu nhiên
    const getStatus = () => (Math.random() > 0.7 ? "online" : "offline");


    // --- MODAL & FORM HANDLERS ---
    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields(); // Reset form khi đóng
    };

    const handleAddCustomer = (values) => {
        const newCustomer = {
            id: dataSource.length + 100,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
            address: { city: values.city },
            totalOrders: 0,
            joinDate: new Date().toLocaleDateString('vi-VN'),
            key: dataSource.length + 100,
            image: `https://i.pravatar.cc/150?img=${dataSource.length + 100}` // Avatar ngẫu nhiên
        };

        setDataSource([newCustomer, ...dataSource]);
        message.success(`✅ Thêm khách hàng ${newCustomer.firstName} thành công!`);
        handleCancel();
    };


    // --- Cột bảng ---
    const columns = [
        {
            title: "Khách hàng",
            dataIndex: "firstName",
            key: "name",
            width: '30%', // Tăng độ rộng để chứa cả Avatar/Tag
            render: (text, record) => (
                <Space size={12}>
                    <Badge
                        dot
                        color={getStatus() === "online" ? "green" : "gray"}
                        offset={[-4, 48]}
                    >
                        <Avatar
                            src={record.image}
                            size={52}
                            icon={<UserOutlined />}
                            style={{ border: "1px solid #ddd" }}
                        />
                    </Badge>
                    <Space direction="vertical" size={0}>
                        <Text strong style={{ color: "#2c3e50" }}>
                            {record.firstName} {record.lastName}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 13 }}>
                            {record.email}
                        </Text>
                        <Tag 
                            size="small"
                            color={getStatus() === "online" ? "blue-inverse" : "default"}
                            style={{ marginTop: 4, width: 'fit-content', fontWeight: 500 }}
                        >
                            {getStatus() === "online" ? "Đang hoạt động" : "Ngoại tuyến"}
                        </Tag>
                    </Space>
                </Space>
            ),
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            align: 'center',
            width: '15%',
            render: (phone) => (
                <Tag
                    color="geekblue"
                    icon={<PhoneOutlined />}
                    style={{ fontWeight: 600, borderRadius: 6, fontSize: 13, padding: "4px 10px" }}
                >
                    {phone}
                </Tag>
            ),
        },
        {
            title: "Thành phố",
            dataIndex: "address",
            key: "city",
            width: '15%',
            render: (address) => (
                <Space>
                    <EnvironmentOutlined style={{ color: "#1677ff" }} />
                    <Text strong>{address.city}</Text>
                </Space>
            ),
        },
        {
            title: "Đơn hàng",
            dataIndex: "totalOrders",
            key: "orders",
            align: 'center',
            width: '10%',
            render: (orders) => (
                <Text strong style={{ color: orders > 10 ? '#ffc53d' : '#333' }}>{orders}</Text>
            )
        },
        {
            title: "Ngày tham gia",
            dataIndex: "joinDate",
            key: "joinDate",
            width: '15%',
            render: (date) => (
                <Text type="secondary">{date}</Text>
            )
        },
        {
            title: "Hành động",
            key: "action",
            width: '15%',
            align: 'center',
            render: (record) => (
                <Space size="small">
                    <Tooltip title="Chỉnh sửa hồ sơ">
                        <Button icon={<EditOutlined />} type="text" size="small" />
                    </Tooltip>
                    <Tooltip title="Xem lịch sử mua hàng">
                        <Button icon={<HistoryOutlined />} type="text" size="small" />
                    </Tooltip>
                </Space>
            )
        }
    ];

    return (
        <>
            <Space
                size={24}
                direction="vertical"
                style={{
                    width: "100%",
                    padding: "24px",
                    background: "#f5f7fa",
                    borderRadius: "12px",
                }}
            >
                
                {/* --- HEADER & ACTION BAR --- */}
                <Card bordered={false} style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
                    <Flex justify="space-between" align="center">
                        {/* Tiêu đề */}
                        <Title
                            level={3}
                            style={{ display: "flex", alignItems: "center", gap: "12px", color: "#262626", margin: 0 }}
                        >
                            <UserOutlined style={{ color: "#fff", backgroundColor: "#FCD9C4", borderRadius: "50%", padding: 10, fontSize: 22, boxShadow: "0 3px 6px rgba(114,46,209,0.3)" }} />
                            <span style={{ fontWeight: 700 }}>
                                Danh sách khách hàng 
                            </span>
                        </Title>
                    
                        {/* Công cụ (Search, Filter, Add) */}
                        <Space size="middle">
                            <Search
                                placeholder="Tìm khách hàng..."
                                style={{ width: 220 }}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                enterButton={<SearchOutlined />}
                            />
                            
                            <Select
                                value={selectedCity}
                                onChange={(value) => setSelectedCity(value)}
                                style={{ width: 160 }}
                                placeholder="Lọc theo Thành phố"
                            >
                                {cities.map((city) => (
                                    <Option key={city} value={city}>{city}</Option>
                                ))}
                            </Select>
                            
                            <Button 
                                type="primary" 
                                icon={<UserAddOutlined />} 
                                style={{ fontWeight: 600, backgroundColor: '#1890ff' }}
                                onClick={showModal} // ✅ Kích hoạt Modal
                            >
                                Thêm mới
                            </Button>
                        </Space>
                    </Flex>
                </Card>
                
                {/* --- Bảng dữ liệu khách hàng --- */}
                <Card
                    bordered={false}
                    style={{
                        borderRadius: 12,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                    }}
                    bodyStyle={{ padding: "0" }}
                >
                    <Table
                        loading={loading}
                        size="large"
                        columns={columns}
                        dataSource={filteredData}
                        rowKey="id"
                        pagination={{
                            position: ["bottomCenter"],
                            pageSize: 8,
                            showSizeChanger: false, 
                           // Thêm showTotal
                        }}
                        scroll={{ x: 'max-content' }}
                    />
                </Card>
            </Space>

            {/* --- MODAL THÊM KHÁCH HÀNG MỚI --- */}
            <Modal
                title={<Space><UserAddOutlined style={{color: '#1890ff'}} /> Thêm Khách hàng mới</Space>}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null} // Tắt footer mặc định để dùng nút submit của Form
            >
                <Form 
                    form={form} 
                    layout="vertical" 
                    onFinish={handleAddCustomer} 
                    initialValues={{ city: 'Đà Nẵng' }}
                >
                    <Form.Item
                        name="lastName"
                        label="Họ"
                        rules={[{ required: true, message: "Vui lòng nhập Họ!" }]}
                    >
                        <Input placeholder="Ví dụ: Nguyễn" />
                    </Form.Item>
                    <Form.Item
                        name="firstName"
                        label="Tên"
                        rules={[{ required: true, message: "Vui lòng nhập Tên!" }]}
                    >
                        <Input placeholder="Ví dụ: Văn A" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, type: 'email', message: "Vui lòng nhập Email hợp lệ!" }]}
                    >
                        <Input placeholder="Ví dụ: tenkhachhang@email.com" />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[{ required: true, message: "Vui lòng nhập Số điện thoại!" }]}
                    >
                        <Input placeholder="Ví dụ: +8490xxxxxxx" />
                    </Form.Item>
                    <Form.Item
                        name="city"
                        label="Thành phố"
                        rules={[{ required: true, message: "Vui lòng chọn Thành phố!" }]}
                    >
                         <Select placeholder="Chọn thành phố">
                            {/* Bạn có thể tùy chỉnh danh sách này */}
                            <Option value="Đà Nẵng">Đà Nẵng</Option>
                            <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
                            <Option value="Hà Nội">Hà Nội</Option>
                            <Option value="Hải Phòng">Hải Phòng</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0 }}>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            block
                            style={{ marginTop: 10, fontWeight: 600, backgroundColor: '#1890ff' }}
                        >
                            Thêm Khách hàng
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default Customers;