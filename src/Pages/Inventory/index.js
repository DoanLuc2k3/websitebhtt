import {
  Avatar,
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Rate,
  Space,
  Table,
  Tag,
  Typography,
  message,
  Select,
  Popconfirm,
} from "antd";
import { useEffect, useState } from "react";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { getInventory } from "../../API";

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    getInventory().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  };

  //  Mở modal thêm mới hoặc chỉnh sửa
  const openModal = (record = null) => {
    setEditingProduct(record);
    if (record) form.setFieldsValue(record);
    else form.resetFields();
    setIsModalOpen(true);
  };

  //  Đóng modal
  const closeModal = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  //  Thêm hoặc cập nhật sản phẩm
  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editingProduct) {
        // cập nhật
        setDataSource((prev) =>
          prev.map((item) =>
            item.id === editingProduct.id ? { ...item, ...values } : item
          )
        );
        message.success("Cập nhật sản phẩm thành công!");
      } else {
        // thêm mới
        const newProduct = {
          ...values,
          id: Date.now(),
        };
        setDataSource((prev) => [newProduct, ...prev]);
        message.success("Thêm sản phẩm mới thành công!");
      }
      closeModal();
    });
  };

  //  Xóa sản phẩm
  const handleDelete = (id) => {
    setDataSource((prev) => prev.filter((item) => item.id !== id));
    message.success("Xóa sản phẩm thành công!");
  };

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
      {/* --- TIÊU ĐỀ + NÚT THÊM --- */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography.Title
          level={3}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#262626",
            margin: 0,
          }}
        >
          <DatabaseOutlined
            style={{
             color: "#fff",
              backgroundColor: "orange",
              borderRadius: "50%",
              padding: 10,
              fontSize: 22,
              boxShadow: "0 3px 6px rgba(128,0,128,0.3)",
            }}
          />
          <span style={{ fontWeight: 600 }}>Quản lý kho</span>
        </Typography.Title>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{
            borderRadius: 8,
            backgroundColor: "#0a75bbff",
          }}
          onClick={() => openModal()}
        >
          Thêm sản phẩm
        </Button>
      </div>

      {/* --- BẢNG DỮ LIỆU --- */}
      <div
        style={{
          width: "100%",
          background: "#fff",
          padding: "16px 20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        }}
      >
        <Table
          loading={loading}
          rowKey="id"
          columns={[
            {
              title: "Ảnh",
              dataIndex: "thumbnail",
              render: (link) => (
                <Avatar
                  src={link}
                  shape="square"
                  size={54}
                  style={{ borderRadius: 10, objectFit: "cover" }}
                />
              ),
              width: 90,
            },
            {
              title: "Tên sản phẩm",
              dataIndex: "title",
              width: 220,
              render: (text) => (
                <Typography.Text strong style={{ color: "#262626" }}>
                  {text}
                </Typography.Text>
              ),
            },
            {
  title: "Giá (VND)",
  dataIndex: "price",
  render: (value) => (
    <Typography.Text style={{ color: "#000000ff", fontWeight: 500 }}>
      {value?.toLocaleString('vi-VN')} VNĐ
    </Typography.Text>
  ),
  width: 150,
},
            {
              title: "Đánh giá",
              dataIndex: "rating",
              render: (rating) => (
                <Rate
                  value={rating}
                  allowHalf
                  disabled
                  style={{ fontSize: 16, color: "#faad14" }}
                />
              ),
              width: 200,
            },
            {
              title: "Tồn kho",
              dataIndex: "stock",
              width: 100,
              render: (stock) => (
                <Tag
                  color={stock > 50 ? "blue" : stock > 20 ? "gold" : "volcano"}
                  style={{
                    fontWeight: 500,
                    borderRadius: 6,
                    fontSize: 13,
                    padding: "2px 10px",
                  }}
                >
                  {stock}
                </Tag>
              ),
            },
            {
              title: "Thương hiệu",
              dataIndex: "brand",
              width: 140,
            },
            {
              title: "Danh mục",
              dataIndex: "category",
              width: 140,
            },
            {
              title: "Hành động",
              key: "actions",
              width: 150,
              render: (_, record) => (
                <Space>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => openModal(record)}
                  />
                  <Popconfirm
                    title="Bạn có chắc muốn xóa sản phẩm này?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Xóa"
                    cancelText="Hủy"
                  >
                    <Button danger icon={<DeleteOutlined />} />
                  </Popconfirm>
                </Space>
              ),
            },
          ]}
          dataSource={dataSource}
          pagination={{
            position: ["bottomCenter"],
            pageSize: 5,
          }}
          style={{
            width: "100%",
            borderRadius: "10px",
          }}
          scroll={{ x: "100%" }}
        />
      </div>

      {/* --- MODAL THÊM / CẬP NHẬT --- */}
      <Modal
        title={
          editingProduct ? "📝 Cập nhật sản phẩm" : "➕ Thêm sản phẩm mới"
        }
        open={isModalOpen}
        onCancel={closeModal}
        onOk={handleSave}
        okText={editingProduct ? "Cập nhật" : "Thêm"}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ rating: 4, stock: 50 }}
        >
          <Form.Item
            name="title"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Nhập tên sản phẩm!" }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá (VND)"
            rules={[{ required: true, message: "Nhập giá sản phẩm!" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              placeholder="VD: 299"
            />
          </Form.Item>
          <Form.Item name="rating" label="Đánh giá">
            <Rate allowHalf />
          </Form.Item>
          <Form.Item name="stock" label="Tồn kho">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="brand" label="Thương hiệu">
            <Input placeholder="VD: Nike, Samsung..." />
          </Form.Item>
          <Form.Item name="category" label="Danh mục">
            <Select
              placeholder="Chọn danh mục"
              options={[
                { value: "electronics", label: "Điện tử" },
                { value: "clothes", label: "Quần áo" },
                { value: "furniture", label: "Nội thất" },
                { value: "accessories", label: "Phụ kiện" },
              ]}
            />
          </Form.Item>
          <Form.Item name="thumbnail" label="Link ảnh sản phẩm">
            <Input placeholder="Nhập URL hình ảnh" />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
}

export default Inventory;
