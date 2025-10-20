// src/pages/Staffs.jsx
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
  Modal,
  Form,
  Button,
  Popconfirm,
  Switch,
  message,
  Tooltip,
  Row,
  Col,
  notification,
} from "antd";
import {
  UserOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
  KeyOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

const STORAGE_KEY = "app_staffs_v1";

// --- Helper: seed data if no storage ---
const seedStaffs = [
  {
    id: "u1",
    fullName: "Doãn Bá Min",
    email: "min@example.com",
    phone: "0912345678",
    role: "admin",
    status: "active", // active | inactive | deleted
    avatar: null,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 20,
  },
  {
    id: "u2",
    fullName: "Doãn Bá Lực",
    email: "a@example.com",
    phone: "0987654321",
    role: "admin",
    status: "active",
    avatar: null,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8,
  },
    {
    id: "u3",
    fullName: "Doãn Chí Bình",
    email: "a@example.com",
    phone: "0987654321",
    role: "staff",
    status: "active",
    avatar: null,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8,
  },
  {
    id: "u4",
    fullName: "Doãn Chí Hiền",
    email: "a@example.com",
    phone: "0987654321",
    role: "staff",
    status: "active",
    avatar: null,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8,
  },
];

// --- Utility functions ---
function uid(prefix = "id") {
  return prefix + Math.random().toString(36).slice(2, 9);
}
function readStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedStaffs));
    return [...seedStaffs];
  }
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedStaffs));
    return [...seedStaffs];
  }
}
function writeStorage(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// --- Notification helpers ---
const openNotificationWithIcon = (type, messageText, description) => {
  notification[type]({
    message: messageText,
    description,
    placement: "topRight",
  });
};

// --- Main component ---
export default function Staffs() {
  // state
  const [loading, setLoading] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(null); // object or null
  const [form] = Form.useForm();

  // init load
  useEffect(() => {
    loadStaffs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // reload filtered when inputs change
  useEffect(() => {
    applyFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, roleFilter, staffs]);

  // load from localStorage
  const loadStaffs = () => {
    setLoading(true);
    setTimeout(() => {
      const list = readStorage().filter((u) => u.status !== "deleted");
      // newest first
      list.sort((a, b) => b.createdAt - a.createdAt);
      setStaffs(list);
      setLoading(false);
    }, 250);
  };

  const applyFilter = () => {
    const term = q.trim().toLowerCase();
    let list = [...staffs];
    if (term) {
      list = list.filter(
        (u) =>
          (u.fullName || "").toLowerCase().includes(term) ||
          (u.email || "").toLowerCase().includes(term) ||
          (u.phone || "").includes(term)
      );
    }
    if (roleFilter !== "all") {
      list = list.filter((u) => u.role === roleFilter);
    }
    setFiltered(list);
  };

  // --- CRUD actions (mocked via localStorage) ---
  const handleAdd = () => {
    setEditing(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditing(record);
    form.setFieldsValue({
      fullName: record.fullName,
      email: record.email,
      phone: record.phone,
      role: record.role,
      status: record.status === "active",
    });
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    const list = readStorage();
    const idx = list.findIndex((u) => u.id === id);
    if (idx === -1) {
      message.error("Không tìm thấy tài khoản");
      return;
    }
    list[idx].status = "deleted"; // soft delete
    writeStorage(list);
    openNotificationWithIcon("success", "Xóa tài khoản", "Đã xóa tài khoản thành công.");
    loadStaffs();
  };

  const handleToggleStatus = (id) => {
    const list = readStorage();
    const idx = list.findIndex((u) => u.id === id);
    if (idx === -1) return;
    list[idx].status = list[idx].status === "active" ? "inactive" : "active";
    writeStorage(list);
    openNotificationWithIcon(
      "success",
      "Cập nhật trạng thái",
      `Tài khoản ${list[idx].fullName} đã ${list[idx].status === "active" ? "kích hoạt" : "vô hiệu"}.`
    );
    loadStaffs();
  };

  const handleResetPassword = (id) => {
    // fake reset
    const newPwd = Math.random().toString(36).slice(2, 10);
    // In real app we'd call backend to send email
    openNotificationWithIcon(
      "info",
      "Reset mật khẩu",
      `Mật khẩu mới cho user (fake): ${newPwd} — hãy nhắc họ đổi sau khi đăng nhập.`
    );
  };

  const handleSubmitForm = async () => {
    try {
      const values = await form.validateFields();
      const list = readStorage();
      if (editing) {
        // update
        const idx = list.findIndex((u) => u.id === editing.id);
        if (idx === -1) throw new Error("Tài khoản không tồn tại");
        list[idx] = {
          ...list[idx],
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          role: values.role,
          status: values.status ? "active" : "inactive",
        };
        writeStorage(list);
        openNotificationWithIcon("success", "Cập nhật", "Cập nhật thông tin nhân viên thành công.");
      } else {
        // create
        const newUser = {
          id: uid("u"),
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          role: values.role,
          avatar: null,
          status: values.status ? "active" : "inactive",
          createdAt: Date.now(),
        };
        list.push(newUser);
        writeStorage(list);
        openNotificationWithIcon("success", "Thêm mới", "Tạo tài khoản nhân viên thành công.");
      }
      setModalVisible(false);
      setEditing(null);
      form.resetFields();
      loadStaffs();
    } catch (err) {
      // validation fails will be handled by antd form
      // console.log(err);
    }
  };

  // columns for table
  const columns = [
    {
      title: "Nhân viên",
      dataIndex: "fullName",
      key: "fullName",
      width: 280,
      render: (text, record) => (
        <Space>
          <Badge
            dot
            color={record.status === "active" ? "green" : "gray"}
            offset={[-6, 40]}
          >
            <Avatar
              size={48}
              src={record.avatar}
              style={{ backgroundColor: "#fde3cf", color: "#f56a00", border: "1px solid #f0f0f0" }}
            >
              {!record.avatar && (record.fullName || "U").charAt(0).toUpperCase()}
            </Avatar>
          </Badge>
          <div>
            <Text strong style={{ color: "#333" }}>
              {record.fullName}
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
      key: "phone",
      render: (phone) => (
        <Tag color="blue" style={{ borderRadius: 6 }}>
          {phone || "-"}
        </Tag>
      ),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) =>
        role === "admin" ? (
          <Tag color="gold" style={{ fontWeight: 600 }}>
            <TeamOutlined /> Admin
          </Tag>
        ) : (
          <Tag color="cyan" style={{ fontWeight: 600 }}>
            Nhân viên
          </Tag>
        ),
      filters: [
        { text: "Admin", value: "admin" },
        { text: "Staff", value: "staff" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Switch
            checkedChildren={<UnlockOutlined />}
            unCheckedChildren={<LockOutlined />}
            checked={status === "active"}
            onChange={() => handleToggleStatus(record.id)}
          />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {status === "active" ? "Hoạt động" : "Vô hiệu"}
          </Text>
        </div>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      fixed: "right",
      width: 170,
      render: (_, record) => (
        <Space>
          <Tooltip title="Sửa">
            <Button
              icon={<EditOutlined />}
              type="text"
              onClick={() => handleEdit(record)}
            />
          </Tooltip>

          <Tooltip title="Reset mật khẩu">
            <Button
              icon={<KeyOutlined />}
              type="text"
              onClick={() => handleResetPassword(record.id)}
            />
          </Tooltip>

          <Popconfirm
            title="Bạn có chắc muốn xóa tài khoản này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Tooltip title="Xóa">
              <Button icon={<DeleteOutlined />} type="text" danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // roles for filter select
  const roles = ["all", "admin", "staff"];

  return (
    <Space
      size={20}
      direction="vertical"
      style={{
        width: "100%",
        padding: 24,
        background: "#f5f7fa",
        borderRadius: 12,
      }}
    >
      {/* header */}
      <Row justify="space-between" align="middle">
        <Col>
          <Title
            level={3}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 0,
            }}
          >
            <UserOutlined
              style={{
                color: "#fff",
                backgroundColor: "Teal",
                borderRadius: "50%",
                padding: 10,
                fontSize: 20,
                boxShadow: "0 4px 10px rgba(114,46,209,0.2)",
              }}
            />
            <span style={{ fontWeight: 700 }}>Quản lý nhân viên</span>
          </Title>
        </Col>

        <Col>
          <Space>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Tìm theo tên, email hoặc phone..."
              style={{ width: 300, borderRadius: 8 }}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              allowClear
            />

            <Select
  value={roleFilter}
  onChange={(val) => setRoleFilter(val)}
  style={{ width: 140, borderRadius: 8 }}
>
  {roles.map((r) => (
    <Option key={r} value={r}>
      {r === "all" ? "Tất cả vai trò" : r === "admin" ? "Admin" : "Nhân viên"}
    </Option>
  ))}
</Select>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
              style={{ borderRadius: 8, backgroundColor: "#0a75bbff",}}
            >
              Thêm nhân viên
            </Button>
          </Space>
        </Col>
      </Row>

      {/* table card */}
      <Card
        style={{
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          border: "1px solid #f0f0f0",
          background: "#fff",
        }}
        bodyStyle={{ padding: 16 }}
      >
        <Table
          loading={loading}
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          size="middle"
          pagination={{
            position: ["bottomCenter"],
            pageSize: 6,
            showSizeChanger: false,
          }}
          scroll={{ x: 900 }}
        />
      </Card>

      {/* Modal Add / Edit */}
      <Modal
        title={editing ? "Chỉnh sửa nhân viên" : "Thêm nhân viên"}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditing(null);
          form.resetFields();
        }}
        onOk={handleSubmitForm}
        okText={editing ? "Lưu" : "Tạo"}
        cancelText="Hủy"
        maskClosable={false}
        destroyOnClose
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="email@domain.com" />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="phone">
            <Input placeholder="Ví dụ: 09xxxxxxxx" />
          </Form.Item>

          <Form.Item
            label="Vai trò"
            name="role"
            rules={[{ required: true, message: "Chọn vai trò" }]}
          >
            <Select>
              <Option value="staff">Nhân viên</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Kích hoạt" name="status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
}
