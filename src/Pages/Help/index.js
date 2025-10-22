import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  List,
  Form,
  Input,
  Button,
  message,
  Timeline,
  Space,
  Select, 
  Divider, 
} from "antd";
import {
  ApiOutlined,
  DatabaseOutlined,
  CloudOutlined,
  InfoCircleOutlined,
  SyncOutlined,
  QuestionCircleOutlined,
  MessageOutlined,
  MailOutlined,
  PhoneOutlined,
  SearchOutlined, 
  ToolOutlined, 
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { TextArea, Search } = Input;
const { Option } = Select;

const SupportDashboard = () => {
  const [diagnosisId, setDiagnosisId] = useState("");
  const [form] = Form.useForm();
  
  // Màu sắc thống nhất
  const PRIMARY_BLUE = '#1677ff';
  const PRIMARY_PURPLE = '#722ed1';

  // Dữ liệu trạng thái hệ thống
  const [services] = useState([
    { name: "API Chính", status: "Hoạt động", color: "green", icon: <ApiOutlined /> },
    { name: "Cơ sở dữ liệu", status: "Hoạt động", color: "green", icon: <DatabaseOutlined /> },
    { name: "Máy chủ lưu trữ", status: "Bảo trì", color: "gold", icon: <CloudOutlined /> },
  ]);

  // Dữ liệu hướng dẫn nhanh (FAQ)
  const quickHelps = [
    { title: "Cách thêm sản phẩm mới", description: "Đi tới mục 'Quản lý kho' → 'Thêm sản phẩm'." },
    { title: "Xử lý đơn hàng bị lỗi", description: "Trong 'Đơn hàng', kiểm tra trạng thái thanh toán và liên hệ đối tác vận chuyển." },
    { title: "Xem báo cáo doanh thu", description: "Chọn 'Báo cáo' để xem biểu đồ chi tiết theo tháng." },
  ];

  //  FIX: Thêm lại dữ liệu cập nhật hệ thống (updates)
  const [updates] = useState([
    {
      version: "v2.1.0",
      date: "20/10/2025",
      changes: "Thêm các tính năng nâng cao hơn và tối ưu hiệu suất.",
    },
    {
      version: "v2.0.5",
      date: "12/10/2025",
      changes: "Cải thiện giao diện quản lý đơn hàng.",
    },
    {
      version: "v2.0.0",
      date: "11/10/2025",
      changes: "Ra mắt giao diện Admin Dashboard đầu tiên.",
    },
  ]);


  // Logic chạy chẩn đoán
  const handleRunDiagnosis = () => {
    if (!diagnosisId) {
      message.warning("Vui lòng nhập ID Đơn hàng hoặc ID Người dùng!");
      return;
    }
    // Thực tế: gọi API chẩn đoán tại đây
    message.loading({ content: `Đang chạy chẩn đoán cho ID: ${diagnosisId}...`, key: 'diag' });
    setTimeout(() => {
        message.success({ content: `✅ Chẩn đoán hoàn tất. Trạng thái ID ${diagnosisId}: OK.`, key: 'diag', duration: 3 });
        setDiagnosisId("");
    }, 1500);
  };

  // Form gửi phản hồi
  const onFinish = (values) => {
    console.log(values);
    message.success("🎉 Gửi phản hồi thành công! Cảm ơn bạn đã đóng góp.");
    form.resetFields();
  };

  // Hàm tạo Card chung với style đồng bộ
  const StyledCard = ({ title, icon, children, style = {} }) => (
    <Card 
        title={
            <Space style={{ color: PRIMARY_PURPLE }}>
                {React.cloneElement(icon, { style: { color: PRIMARY_PURPLE, fontSize: 18 } })}
                <Text strong style={{ color: PRIMARY_PURPLE }}>{title}</Text>
            </Space>
        } 
        bordered={false} 
        style={{ 
            borderRadius: 12, 
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            ...style
        }}
    >
        {children}
    </Card>
  );

  return (
    <div style={{ padding: 24, background: '#f5f7fa', minHeight: '100vh' }}>
      
      {/* --- TIÊU ĐỀ CHÍNH --- */}
      <Title level={3} style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
        <div 
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#e6f4ff', borderRadius: '50%', padding: '8px', 
            marginRight: 10,
          }}
        >
          <InfoCircleOutlined style={{ color: PRIMARY_BLUE, fontSize: '20px' }} />
        </div>
        Trung tâm Hỗ trợ & Chẩn đoán
      </Title>
      <Paragraph type="secondary" style={{ marginBottom: 30 }}>
        Kiểm tra tình trạng hệ thống, tìm kiếm tài liệu và gửi yêu cầu hỗ trợ nhanh.
      </Paragraph>

      <Row gutter={[24, 24]}>
        
        {/* --- CỘT TRÁI (Tools & Status) --- */}
        <Col xs={24} lg={12}>

          {/* 1. Công cụ Chẩn đoán nhanh */}
          <StyledCard title="Công cụ Chẩn đoán nhanh" icon={<ToolOutlined />}>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Text type="secondary">Nhập ID để kiểm tra trạng thái Order hoặc User:</Text>
                <Input.Group compact>
                    <Input
                        style={{ width: 'calc(100% - 100px)' }}
                        placeholder="Nhập Order ID hoặc User ID"
                        prefix={<SearchOutlined />}
                        value={diagnosisId}
                        onChange={(e) => setDiagnosisId(e.target.value)}
                    />
                    <Button type="primary" onClick={handleRunDiagnosis} style={{ width: 100 }}>
                        Chạy
                    </Button>
                </Input.Group>
            </Space>
          </StyledCard>
          
          <Divider />

          {/* 2. Trạng thái hệ thống */}
          <StyledCard title="Trạng thái dịch vụ" icon={<ApiOutlined />}>
            <List
              dataSource={services}
              renderItem={(item) => (
                <List.Item>
                  <Space>
                    {item.icon}
                    <Text strong>{item.name}</Text>
                  </Space>
                  <Tag color={item.color} style={{ fontWeight: 600 }}>
                    {item.status}
                  </Tag>
                </List.Item>
              )}
            />
          </StyledCard>

          {/* 3. Cập nhật hệ thống */}
          <Card
            title={<Space style={{ color: PRIMARY_PURPLE }}><SyncOutlined style={{ color: PRIMARY_PURPLE, fontSize: 18 }} /> <Text strong style={{ color: PRIMARY_PURPLE }}>Nhật ký Cập nhật</Text></Space>}
            style={{ marginTop: 24, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
            bordered={false}
          >
            <Timeline
              items={updates.map((u, index) => ({
                color: index === 0 ? "green" : "blue",
                children: (
                  <div>
                    <Text strong>{u.version}</Text> – <Text type="secondary">{u.date}</Text>
                    <Paragraph style={{ margin: 0 }}>{u.changes}</Paragraph>
                  </div>
                ),
              }))}
            />
          </Card>
        </Col>

        {/* --- CỘT PHẢI (Help & Contact) --- */}
        <Col xs={24} lg={12}>
          
          {/* 4. Hướng dẫn nhanh & Tìm kiếm Tài liệu */}
          <StyledCard title="Tìm kiếm Hướng dẫn" icon={<QuestionCircleOutlined />}>
            <Search 
                placeholder="Tìm kiếm FAQ, Tài liệu hỗ trợ..." 
                enterButton="Tìm" 
                size="large"
                style={{ marginBottom: 16 }}
            />
            
            <List
              header={<Text strong>FAQ Phổ biến:</Text>}
              dataSource={quickHelps}
              renderItem={(item) => (
                <List.Item style={{ padding: '8px 0' }}>
                  <List.Item.Meta
                    title={<Text style={{ color: PRIMARY_BLUE }}>{item.title}</Text>}
                    description={<Text type="secondary">{item.description}</Text>}
                  />
                </List.Item>
              )}
            />
          </StyledCard>
          
          <Divider />

          {/* 5. Form gửi phản hồi (Ticket nội bộ) */}
          <StyledCard title="Gửi Phản hồi (Ticket)" icon={<MessageOutlined />}>
            <Form layout="vertical" form={form} onFinish={onFinish}>
              <Form.Item label="Phân loại" name="category" rules={[{ required: true, message: "Chọn loại yêu cầu!" }]}>
                <Select placeholder="Chọn loại yêu cầu">
                  <Option value="bug">Báo lỗi</Option>
                  <Option value="feature">Đề xuất tính năng</Option>
                  <Option value="question">Câu hỏi</Option>
                </Select>
              </Form.Item>
              
              <Form.Item label="Tên" name="name" rules={[{ required: true, message: "Nhập tên!" }]}>
                <Input placeholder="Tên của bạn" />
              </Form.Item>
              
              <Form.Item label="Nội dung" name="feedback" rules={[{ required: true, message: "Nhập phản hồi!" }]}>
                <TextArea rows={3} placeholder="Mô tả chi tiết vấn đề hoặc đề xuất..." />
              </Form.Item>
              
              <Button type="primary" htmlType="submit" block>
                Gửi Phản hồi
              </Button>
            </Form>
          </StyledCard>
          
          {/* 6. Liên hệ kỹ thuật */}
         <Card
  title={
    <Space style={{ color: PRIMARY_PURPLE }}>
        {/*  Icon và Tiêu đề đồng bộ */}
        <PhoneOutlined style={{ color: PRIMARY_PURPLE, fontSize: 18 }} /> 
        <Text strong style={{ color: PRIMARY_PURPLE }}>Liên hệ Kỹ thuật</Text>
    </Space>
  }
  style={{ marginTop: 24, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
  bordered={false}
>
  {/*  Nâng cấp Bố cục: Dùng Row/Col cho Email và Hotline */}
  <Row gutter={[16, 16]}>
    {/* Thẻ Email */}
    <Col xs={24} sm={12}>
      <Card 
        size="small" 
        style={{ 
          backgroundColor: '#f6ffed', /* Nền xanh lá nhạt */
          borderLeft: '4px solid #52c41a', /* Đường viền nổi bật */
        }}
        bordered={false}
      >
        <Paragraph style={{ margin: 0 }}>
          <Text type="secondary" style={{ display: 'block' }}>Email Hỗ trợ</Text>
          <Text strong><MailOutlined style={{ marginRight: 6 }} /> bamin.com</Text>
        </Paragraph>
      </Card>
    </Col>

    {/* Thẻ Hotline */}
    <Col xs={24} sm={12}>
      <Card 
        size="small" 
        style={{ 
          backgroundColor: '#e6f4ff', /* Nền xanh dương nhạt */
          borderLeft: '4px solid #1677ff', /* Đường viền nổi bật */
        }}
        bordered={false}
      >
        <Paragraph style={{ margin: 0 }}>
          <Text type="secondary" style={{ display: 'block' }}>Hotline Khẩn cấp</Text>
          <Text strong style={{ color: '#1677ff' }}><PhoneOutlined style={{ marginRight: 6 }} /> 8888 9999</Text>
        </Paragraph>
      </Card>
    </Col>
  </Row>
  
  <Divider style={{ margin: '16px 0 8px 0' }} />

  {/* Thời gian hỗ trợ */}
  <Paragraph style={{ margin: 0 }}>
    <Text type="secondary">Thời gian hỗ trợ: Thứ 2 - Thứ 6 (8h - 17h)</Text>
  </Paragraph>
</Card>
        </Col>
      </Row>

      {/* Footer */}
      <Card style={{ marginTop: 32, textAlign: "center", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }} bordered={false}>
        <Text type="secondary">
          LMSHOP ADMIN BY MIN
        </Text>
      </Card>
    </div>
  );
};

export default SupportDashboard;