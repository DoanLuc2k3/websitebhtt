import React, { useEffect, useState } from "react";
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
} from "antd";
import { getCustomers } from "../../API";
import {
  UserOutlined,
  SearchOutlined,
  EnvironmentOutlined,
  UserAddOutlined,
  PhoneOutlined,
  EditOutlined, 
  HistoryOutlined, 
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCity, setSelectedCity] = useState("Tất cả");

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      // Giả lập thêm trường totalOrders và joinDate
      const usersData = (res.users || []).map((user, index) => ({
        ...user,
        totalOrders: Math.floor(Math.random() * 50),
        joinDate: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN'),
      }));
      setDataSource(usersData);
      setFilteredData(usersData);
      setLoading(false);
    });
  }, []);

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

  const cities = [
    "Tất cả",
    ...new Set(dataSource.map((item) => item.address.city)),
  ];

  // Hàm tạo trạng thái hoạt động ngẫu nhiên
  const getStatus = () => (Math.random() > 0.7 ? "online" : "offline");

  // Cột bảng
  const columns = [
    {
      title: "Khách hàng",
      dataIndex: "firstName",
      key: "name",
      width: '25%',
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
      title: "Tổng đơn hàng",
      dataIndex: "totalOrders",
      key: "orders",
      align: 'center',
      width: '15%',
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
                <UserOutlined style={{ color: "#fff", backgroundColor: "#722ed1", borderRadius: "50%", padding: 10, fontSize: 22, boxShadow: "0 3px 6px rgba(114,46,209,0.3)" }} />
                <span style={{ fontWeight: 700 }}>
                    {/* ✅ FIX: Đã xóa {filteredData.length} */}
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
              
              <Button type="primary" icon={<UserAddOutlined />} style={{ fontWeight: 600 }}>
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
            showTotal: false,        
          }}
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </Space>
  );
}

export default Customers;