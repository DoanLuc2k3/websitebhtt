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
} from "antd";
import { useEffect, useState } from "react";
import { getCustomers } from "../../API";
import {
  UserOutlined,
  SearchOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCity, setSelectedCity] = useState("Tất cả");

  // 🟣 Gọi API lấy danh sách khách hàng
  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setDataSource(res.users);
      setFilteredData(res.users);
      setLoading(false);
    });
  }, []);

  // 🟣 Lọc dữ liệu theo tên và thành phố
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

  // 🟣 Lấy danh sách thành phố
  const cities = [
    "Tất cả",
    ...new Set(dataSource.map((item) => item.address.city)),
  ];

  // 🟣 Thêm trạng thái hoạt động ngẫu nhiên
  const getStatus = () => (Math.random() > 0.5 ? "online" : "offline");

  // 🟣 Cột bảng
  const columns = [
    {
      title: "Khách hàng",
      dataIndex: "firstName",
      key: "name",
      render: (text, record) => (
        <Space>
          <Badge
            dot
            color={getStatus() === "online" ? "green" : "gray"}
            offset={[-5, 40]}
          >
            <Avatar
              src={record.image}
              size={48}
              icon={<UserOutlined />}
              style={{ border: "1px solid #eee" }}
            />
          </Badge>
          <div>
            <Text strong style={{ color: "#333" }}>
              {record.firstName} {record.lastName}
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: 13 }}>
              {record.email}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      render: (phone) => (
        <Tag
          color="blue"
          style={{
            fontWeight: 500,
            borderRadius: 6,
            fontSize: 13,
            padding: "2px 10px",
          }}
        >
          {phone}
        </Tag>
      ),
    },
    {
      title: "Thành phố",
      dataIndex: "address",
      render: (address) => (
        <Space>
          <EnvironmentOutlined style={{ color: "#1677ff" }} />
          <Text>{address.city}</Text>
        </Space>
      ),
    },
    {
      title: "Địa chỉ cụ thể",
      dataIndex: "address",
      render: (address) => (
        <Text style={{ color: "#666" }}>{address.address}</Text>
      ),
    },
  ];

  return (
    <Space
      size={20}
      direction="vertical"
      style={{
        width: "100%",
        padding: "24px",
        background: "#f5f7fa",
        borderRadius: "12px",
      }}
    >
      {/* 🟣 Tiêu đề */}
      <Flex justify="space-between" align="center">
        <Title
          level={3}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#262626",
            marginBottom: 0,
          }}
        >
          <UserOutlined
            style={{
              color: "#fff",
              backgroundColor: "purple",
              borderRadius: "50%",
              padding: 10,
              fontSize: 22,
              boxShadow: "0 3px 6px rgba(128,0,128,0.3)",
            }}
          />
          <span style={{ fontWeight: 600 }}>Danh sách khách hàng</span>
        </Title>

        {/* 🟣 Thanh tìm kiếm + Lọc */}
        <Space>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Tìm khách hàng..."
            style={{
              width: 220,
              borderRadius: 8,
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Select
            value={selectedCity}
            onChange={(value) => setSelectedCity(value)}
            style={{ width: 160, borderRadius: 8 }}
          >
            {cities.map((city) => (
              <Option key={city} value={city}>
                {city}
              </Option>
            ))}
          </Select>
        </Space>
      </Flex>

      {/* 🟣 Bảng dữ liệu khách hàng */}
      <Card
        style={{
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          border: "1px solid #f0f0f0",
          background: "#fff",
        }}
        bodyStyle={{ padding: "20px 24px" }}
      >
        <Table
          loading={loading}
          size="middle"
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            position: ["bottomCenter"],
            pageSize: 5,
            showSizeChanger: false,
          }}
          style={{
            borderRadius: 8,
          }}
        />
      </Card>
    </Space>
  );
}

export default Customers;
