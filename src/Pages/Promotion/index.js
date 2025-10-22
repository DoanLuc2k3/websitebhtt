import React, { useState } from 'react';
import { 
    Tabs, Layout, Typography, Space, Button, Table, Tag, 
    Modal, Form, Input, DatePicker, Select, Switch, Card, 
    Divider, Slider, List, Descriptions, Progress, Upload, message 
} from 'antd';
import { 
    GiftOutlined, TagOutlined, CrownOutlined, 
    PlusOutlined, EditOutlined, DeleteOutlined, SettingOutlined, 
    UploadOutlined, 
    FireOutlined // Icon nổi bật cho khuyến mãi
} from '@ant-design/icons';
import moment from 'moment'; // Yêu cầu đã cài đặt 'moment'

const { Content } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;

// Định dạng ngày tháng cho moment (tùy chọn)
const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm";

// ======================================================================
// 1. Dữ liệu mẫu (Mock Data)
// ======================================================================

const mockCampaigns = [
    { key: '1', name: 'Sale Hè Siêu Tốc', type: 'Giảm giá %', time: ['2025-06-01', '2025-06-30'], status: 'active', performance: '150 đơn (120M VNĐ)' },
    { key: '2', name: 'Miễn Phí Vận Chuyển Toàn Quốc', type: 'Miễn phí ship', time: ['2025-05-01', '2025-12-31'], status: 'scheduled', performance: 'N/A' },
];

const mockCoupons = [
    { key: 'c1', code: 'SALE10', value: '10%', limit: 500, used: 120, expireDate: '2025-11-30' },
    { key: 'c2', code: 'FREESHIP', value: 'Freeship', limit: 9999, used: 4500, expireDate: '2026-01-01' },
];

const mockCustomers = [
    { key: 'cus1', name: 'Nguyễn Văn A', level: 'Vàng', totalSpent: '25,000,000đ', points: 1250 },
    { key: 'cus2', name: 'Trần Thị B', level: 'Bạc', totalSpent: '8,000,000đ', points: 300 },
];

// ======================================================================
// 2. Component Con (Được định nghĩa trong file index.js)
// Lưu ý: Đã loại bỏ EmailMarketing
// ======================================================================

// --- 2.1. Quản lý Chiến dịch Khuyến mãi (Tab 1) ---
const CampaignsManagement = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();
    const [data, setData] = useState(mockCampaigns); // Quản lý state data

    const handleCreate = () => {
        setEditingRecord(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingRecord(record);
        // Chuyển đổi chuỗi ngày thành object Moment cho RangePicker
        form.setFieldsValue({
            ...record,
            time: [moment(record.time[0]), moment(record.time[1])],
        });
        setIsModalVisible(true);
    };

    const handleSave = (values) => {
        const newRecord = {
            ...values,
            key: editingRecord ? editingRecord.key : Date.now().toString(),
            time: values.time.map(date => date.format('YYYY-MM-DD')), // Lưu lại thành chuỗi
            performance: editingRecord ? editingRecord.performance : '0 đơn (0 VNĐ)',
            status: editingRecord ? editingRecord.status : 'active',
        };
        
        if (editingRecord) {
            setData(data.map(item => item.key === editingRecord.key ? newRecord : item));
        } else {
            setData([...data, newRecord]);
        }
        
        setIsModalVisible(false);
    };

    const columns = [
        { title: 'Tên Chiến dịch', dataIndex: 'name', key: 'name', width: 200 },
        { title: 'Loại Ưu đãi', dataIndex: 'type', key: 'type', render: (type) => <Tag color={type.includes('Giảm giá') ? 'geekblue' : 'green'}>{type}</Tag> },
        { title: 'Thời gian Áp dụng', dataIndex: 'time', key: 'time', render: (time) => `${time[0]} đến ${time[1]}` },
        { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (status, record) => (
            <Switch 
                checked={status === 'active'} 
                checkedChildren="Đang chạy" 
                unCheckedChildren="Tạm dừng"
                onChange={(checked) => {
                    const newStatus = checked ? 'active' : 'paused';
                    setData(data.map(item => item.key === record.key ? { ...item, status: newStatus } : item));
                }}
            />
        )},
        { title: 'Hiệu suất', dataIndex: 'performance', key: 'performance' },
        { title: 'Thao tác', key: 'action', render: (_, record) => (
            <Space size="middle">
                <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>Sửa</Button>
                <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
            </Space>
        )},
    ];

    return (
        <Card title="Danh sách Chiến dịch" extra={<Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>Tạo Chiến dịch Mới</Button>}>
            <Table columns={columns} dataSource={data} rowKey="key" pagination={{ pageSize: 5 }} />
            
            <Modal
                title={editingRecord ? "Chỉnh sửa Chiến dịch" : "Tạo Chiến dịch Mới"}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={700}
            >
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item label="Tên Chiến dịch" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                        <Input placeholder="Ví dụ: Giảm giá mùa hè 2025" />
                    </Form.Item>
                    <Form.Item label="Thời gian áp dụng" name="time" rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}>
                        <RangePicker showTime format={DATE_TIME_FORMAT} style={{ width: '100%' }} />
                    </Form.Item>
                    <Space size="large">
                        <Form.Item label="Loại Ưu đãi" name="type" rules={[{ required: true, message: 'Vui lòng chọn loại!' }]}>
                            <Select placeholder="Chọn loại ưu đãi" style={{ width: 250 }}>
                                <Select.Option value="Giảm giá %">Giảm giá theo %</Select.Option>
                                <Select.Option value="Giảm giá cố định">Giảm giá cố định</Select.Option>
                                <Select.Option value="Miễn phí ship">Miễn phí Vận chuyển</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Giá trị Ưu đãi" name="value" rules={[{ required: true }]}>
                             <Input placeholder="Ví dụ: 15 (nếu là 15%) hoặc 100000 (nếu là tiền mặt)" type="number" style={{ width: 250 }} />
                        </Form.Item>
                    </Space>
                    <Form.Item style={{ marginTop: 24, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setIsModalVisible(false)}>Hủy</Button>
                            <Button type="primary" htmlType="submit">
                                {editingRecord ? 'Lưu Thay Đổi' : 'Tạo Chiến dịch'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

// --- 2.2. Quản lý Mã giảm giá (Coupons Management) (Tab 2) ---
const CouponsManagement = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleCreateBatch = (values) => {
        message.success(`Đã tạo thành công ${values.count} mã!`);
        setIsModalVisible(false);
    };

    const columns = [
        { title: 'Mã Coupon', dataIndex: 'code', key: 'code', render: (code) => <Tag color="volcano">{code}</Tag> },
        { title: 'Giá trị Giảm', dataIndex: 'value', key: 'value' },
        { title: 'Hạn sử dụng', dataIndex: 'expireDate', key: 'expireDate', render: (date) => <Tag color={moment(date).isBefore(moment().add(30, 'days')) ? 'red' : 'blue'}>{date}</Tag> },
        { title: 'Lượt sử dụng', dataIndex: 'used', key: 'used', render: (used, record) => (
            <Progress 
                percent={Math.floor((used / record.limit) * 100)} 
                size="small" 
                format={() => `${used}/${record.limit}`} 
            />
        )},
        { title: 'Thao tác', key: 'action', render: () => (
            <Space size="middle">
                <Button type="link" icon={<EditOutlined />}>Sửa</Button>
                <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
            </Space>
        )},
    ];

    return (
        <Card title="Danh sách Mã giảm giá" extra={
            <Space>
                <Upload showUploadList={false} beforeUpload={() => { message.info('Đang import file...'); return false; }}>
                    <Button icon={<UploadOutlined />}>Import (CSV)</Button>
                </Upload>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>Tạo Hàng Loạt</Button>
            </Space>
        }>
            <Table columns={columns} dataSource={mockCoupons} rowKey="key" pagination={{ pageSize: 5 }} />

            <Modal title="Tạo Mã Giảm Giá Hàng Loạt" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
                <Form form={form} layout="vertical" onFinish={handleCreateBatch}>
                    <Form.Item label="Số lượng mã muốn tạo" name="count" rules={[{ required: true }]} initialValue={100}>
                        <Input type="number" min={1} />
                    </Form.Item>
                    <Form.Item label="Giá trị giảm" name="value" rules={[{ required: true }]}>
                        <Input placeholder="Ví dụ: 20% hoặc 50000" />
                    </Form.Item>
                    <Form.Item label="Hạn sử dụng" name="expiry" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD"/>
                    </Form.Item>
                    <Form.Item style={{ marginTop: 24, textAlign: 'right' }}>
                        <Button onClick={() => setIsModalVisible(false)}>Hủy</Button>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}>Tạo Mã</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

// --- 2.3. Khách hàng Thân thiết (Loyalty Program) (Tab 3) ---
const LoyaltyManagement = () => {
    
    const loyaltyTiers = [
        { name: 'Bạc', color: 'silver', minSpent: 0, maxSpent: 10000000, benefit: '1x điểm tích lũy,1 voucher giảm giá 20 % cho tất cả các loại hàng' },
        { name: 'Vàng', color: 'gold', minSpent: 10000001, maxSpent: 50000000, benefit: '1.5x điểm tích lũy, 1 voucher sinh nhật' },
        { name: 'Kim Cương', color: 'blue', minSpent: 50000001, maxSpent: Infinity, benefit: '2x điểm tích lũy, Miễn phí vận chuyển' },
    ];

    const columns = [
        { title: 'Khách hàng', dataIndex: 'name', key: 'name' },
        { title: 'Cấp độ', dataIndex: 'level', key: 'level', render: (level) => <Tag color={level === 'Vàng' ? 'gold' : level === 'Bạc' ? 'default' : 'blue'}>{level}</Tag> },
        { title: 'Tổng Chi tiêu', dataIndex: 'totalSpent', key: 'totalSpent' },
        { title: 'Điểm Hiện có', dataIndex: 'points', key: 'points', sorter: (a, b) => a.points - b.points },
        { title: 'Thao tác', key: 'action', render: () => (
            <Button type="link" icon={<SettingOutlined />}>Quản lý Điểm</Button>
        )},
    ];

    return (
        <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Card title="Cấu hình Cấp độ Khách hàng Thân thiết">
                <List
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={loyaltyTiers}
                    renderItem={(item) => (
                        <List.Item>
                            <Card title={item.name} headStyle={{ color: item.color === 'gold' ? 'orange' : item.color, fontWeight: 'bold' }}>
                                <Descriptions column={1} size="small">
                                    <Descriptions.Item label="Ngưỡng chi tiêu">{`${item.minSpent.toLocaleString('vi-VN')}đ - ${item.maxSpent === Infinity ? 'Trở lên' : item.maxSpent.toLocaleString('vi-VN') + 'đ'}`}</Descriptions.Item>
                                    <Descriptions.Item label="Quyền lợi">{item.benefit}</Descriptions.Item>
                                </Descriptions>
                                <Divider style={{ margin: '12px 0' }} />
                                <Slider 
                                    range 
                                    step={1000000} 
                                    defaultValue={[item.minSpent / 1000000, item.maxSpent === Infinity ? 100 : item.maxSpent / 1000000]} 
                                    max={100} 
                                    disabled
                                    tooltip={{ formatter: (value) => `${(value * 1000000).toLocaleString('vi-VN')}đ` }}
                                />
                            </Card>
                        </List.Item>
                    )}
                />
            </Card>
            <Card title="Danh sách Hội viên">
                <Table columns={columns} dataSource={mockCustomers} rowKey="key" pagination={{ pageSize: 5 }} />
            </Card>
        </Space>
    );
};


// ======================================================================
// 3. Component Chính: PromotionPage (Component Export)
// ======================================================================

const PromotionPage = () => {
    
    // Đã loại bỏ Email Marketing
    const promotionItems = [
        {
            key: 'campaigns',
            label: <Space><GiftOutlined /> Chiến dịch Khuyến mãi</Space>,
            children: <CampaignsManagement />,
        },
        {
            key: 'coupons',
            label: <Space><TagOutlined /> Mã giảm giá (Coupons)</Space>,
            children: <CouponsManagement />,
        },
        {
            key: 'loyalty',
            label: <Space><CrownOutlined /> Khách hàng Thân thiết</Space>,
            children: <LoyaltyManagement />,
        },
        // Đã loại bỏ: Email Marketing
    ];

    return (
        <Layout style={{ padding: 24 }}>
            {/* -------------------- Thêm Style Block cho Animation -------------------- */}
            <style>
                {`
                /* Hiệu ứng nhấp nháy/rung nhẹ */
                @keyframes promotion-blink {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.05); }
                }
                /* Hiệu ứng lên xuống giật giật (Bounce) */
                @keyframes title-bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }

                .promotion-alert-icon {
                    color: #ff4d4f; /* Màu đỏ của Ant Design (error color) */
                    font-size: 28px;
                    margin-left: 8px;
                    animation: promotion-blink 1.5s infinite alternate; /* Hiệu ứng nhấp nháy */
                    vertical-align: middle;
                }
                /* Áp dụng hiệu ứng giật giật cho tiêu đề */
                .promotion-title {
                    animation: title-bounce 1s infinite alternate; /* Hiệu ứng giật lên xuống */
                    display: inline-block; /* Quan trọng để animation hoạt động */
                    margin-bottom: 0 !important;
                }
                `}
            </style>
            {/* -------------------------------------------------------------------------- */}

            <Space align="center" style={{ marginBottom: 16 }}> 
                <Title level={3} className="promotion-title" style={{color:"#e12828"}}>Quản lý Marketing & Khuyến mãi</Title>
                <FireOutlined className="promotion-alert-icon" /> 
            </Space>

            <Content
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: '#fff',
                    borderRadius: 8,
                }}
            >
                <Tabs
                    defaultActiveKey="campaigns"
                    size="large"
                    items={promotionItems}
                />
            </Content>
        </Layout>
    );
};

export default PromotionPage;