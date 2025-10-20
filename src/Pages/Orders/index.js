import {
  Space,
  Table,
  Typography,
  Tag,
  Input,
  Select,
  Card,
  Flex,
  Button,
  Modal,
  Form,
  InputNumber,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { getOrders } from "../../API";
import {
  ShoppingCartOutlined,
  SearchOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  //  Lấy dữ liệu đơn hàng mô phỏng
  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      const withStatus = res.products.map((item) => ({
        ...item,
        status:
          item.id % 3 === 0
            ? "Đã giao"
            : item.id % 3 === 1
            ? "Đang xử lý"
            : "Đã hủy",
        date: new Date(
          2025,
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 28) + 1
        ).toLocaleDateString("vi-VN"),
        customer: item.id % 2 === 0 ? "Nguyễn Văn A" : "Trần Thị B",
      }));
      setDataSource(withStatus);
      setFilteredData(withStatus);
      setLoading(false);
    });
  }, []);

  //  Lọc dữ liệu theo tìm kiếm và trạng thái
  useEffect(() => {
    const filtered = dataSource.filter((item) => {
      const matchName = item.title
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const matchStatus =
        filterStatus === "Tất cả" || item.status === filterStatus;
      return matchName && matchStatus;
    });
    setFilteredData(filtered);
  }, [searchValue, filterStatus, dataSource]);

  //  Màu trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case "Đã giao":
        return "green";
      case "Đang xử lý":
        return "gold";
      case "Đã hủy":
        return "volcano";
      default:
        return "blue";
    }
  };

  //  Modal Thêm đơn hàng
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleAddOrder = (values) => {
    const total = values.price * values.quantity;
    const newOrder = {
      id: dataSource.length + 100,
      title: values.title,
      customer: values.customer,
      quantity: values.quantity,
      total,
      status: values.status,
      date: new Date().toLocaleDateString("vi-VN"),
    };
    setDataSource([newOrder, ...dataSource]);
    message.success("✅ Thêm đơn hàng thành công!");
    handleCancel();
  };

  //  Cấu hình bảng
  const columns = [
    {
      title: "STT",
      align: "center",
      width: 70,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      width: 250,
      render: (text) => (
        <Text strong style={{ color: "#262626" }}>
          {text}
        </Text>
      ),
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      width: 160,
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      width: 140,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      align: "center",
      width: 100,
      render: (qty) => (
        <Tag
          color={qty > 2 ? "blue" : "purple"}
          style={{
            fontWeight: 500,
            borderRadius: 6,
            fontSize: 13,
            padding: "2px 10px",
          }}
        >
          {qty}
        </Tag>
      ),
    },
    {
      title: "Tổng cộng",
      dataIndex: "total",
      width: 160,
      render: (value) => (
        <Text
          strong
          style={{
            color: "#1677ff",
            fontWeight: 600,
          }}
        >
          ${value.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 150,
      render: (status) => (
        <Tag
          color={getStatusColor(status)}
          icon={
            status === "Đã giao" ? (
              <CheckCircleOutlined />
            ) : status === "Đang xử lý" ? (
              <ClockCircleOutlined />
            ) : null
          }
          style={{
            fontWeight: 500,
            borderRadius: 6,
            fontSize: 13,
            padding: "4px 10px",
          }}
        >
          {status}
        </Tag>
      ),
    },
  ];

  //  Giao diện chính
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
      {/* Tiêu đề + nút thêm */}
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
          <ShoppingCartOutlined
            style={{
              color: "#fff",
              backgroundColor: "red",
              borderRadius: "50%",
              padding: 10,
              fontSize: 22,
              boxShadow: "0 3px 6px rgba(128,0,128,0.3)",
            }}
          />
          <span style={{ fontWeight: 600 }}>Quản lý đơn hàng</span>
        </Title>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          style={{
            borderRadius: 8,
            backgroundColor: "#0a75bbff",
          }}
        >
          Thêm đơn hàng
        </Button>
      </Flex>

      {/* Thanh tìm kiếm + bộ lọc */}
      <Flex justify="space-between" align="center">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Tìm theo tên sản phẩm..."
          style={{ width: 260, borderRadius: 8 }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <Select
          value={filterStatus}
          style={{ width: 180 }}
          onChange={(value) => setFilterStatus(value)}
        >
          <Option value="Tất cả">Tất cả</Option>
          <Option value="Đã giao">Đã giao</Option>
          <Option value="Đang xử lý">Đang xử lý</Option>
          <Option value="Đã hủy">Đã hủy</Option>
        </Select>
      </Flex>

      {/* Bảng đơn hàng */}
      <Card
        variant="borderless"
        style={{
          borderRadius: 12,
          boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
          background: "#fff",
        }}
        bodyStyle={{ padding: "16px 20px" }}
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
          style={{ width: "100%", borderRadius: "10px" }}
        />
      </Card>

      {/* Modal thêm đơn hàng */}
      <Modal
        title="Thêm đơn hàng mới"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddOrder} form={form}>
          <Form.Item
            name="title"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item
            name="customer"
            label="Tên khách hàng"
            rules={[
              { required: true, message: "Vui lòng nhập tên khách hàng!" },
            ]}
          >
            <Input placeholder="Nhập tên khách hàng" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá sản phẩm (VND)"
            rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm!" }]}
          >
            <InputNumber
              min={1}
              style={{ width: "100%" }}
              placeholder="Nhập giá"
            />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Số lượng"
            rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
          >
            <InputNumber
              min={1}
              style={{ width: "100%" }}
              placeholder="Nhập số lượng"
            />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
          >
            <Select placeholder="Chọn trạng thái">
              <Option value="Đã giao">Đã giao</Option>
              <Option value="Đang xử lý">Đang xử lý</Option>
              <Option value="Đã hủy">Đã hủy</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                backgroundColor: "purple",
                borderRadius: 6,
                fontWeight: 500,
              }}
            >
              Xác nhận thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
}

export default Orders;
