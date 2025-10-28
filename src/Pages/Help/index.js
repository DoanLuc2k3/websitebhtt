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
import { useTranslation } from "react-i18next"; // 👈 IMPORT useTranslation

const { Title, Paragraph, Text } = Typography;
const { TextArea, Search } = Input;
const { Option } = Select;

const SupportDashboard = () => {
    const { t } = useTranslation(); // 👈 Dùng hook dịch

    const [diagnosisId, setDiagnosisId] = useState("");
    const [form] = Form.useForm();
    
    // Màu sắc thống nhất
    const PRIMARY_BLUE = '#1677ff';
    const PRIMARY_PURPLE = '#722ed1';

    // Dữ liệu trạng thái hệ thống (Sử dụng key trạng thái: active, maintenance)
    const [services] = useState([
        { name: t("help_service_api"), status_key: "active", color: "green", icon: <ApiOutlined /> },
        { name: t("help_service_db"), status_key: "active", color: "green", icon: <DatabaseOutlined /> },
        { name: t("help_service_server"), status_key: "maintenance", color: "gold", icon: <CloudOutlined /> },
    ]);

    // Dữ liệu hướng dẫn nhanh (FAQ)
    const quickHelps = [
        { title: t("help_faq_title_add"), description: t("help_faq_desc_add") },
        { title: t("help_faq_title_order"), description: t("help_faq_desc_order") },
        { title: t("help_faq_title_report"), description: t("help_faq_desc_report") },
    ];

    // Dữ liệu cập nhật hệ thống
    const [updates] = useState([
        {
            version: "v2.1.0",
            date: "20/10/2025",
            changes: t("help_update_changes_1"), // 👈 Dịch
        },
        {
            version: "v2.0.5",
            date: "12/10/2025",
            changes: t("help_update_changes_2"), // 👈 Dịch
        },
        {
            version: "v2.0.0",
            date: "11/10/2025",
            changes: t("help_update_changes_3"), // 👈 Dịch
        },
    ]);


    // Logic chạy chẩn đoán
    const handleRunDiagnosis = () => {
        if (!diagnosisId) {
            message.warning(t("help_msg_enter_id")); // 👈 Dịch
            return;
        }
        // Thực tế: gọi API chẩn đoán tại đây
        message.loading({ content: t('help_msg_diag_running', { id: diagnosisId }), key: 'diag' }); // 👈 Dịch
        setTimeout(() => {
            message.success({ 
                content: t('help_msg_diag_complete', { id: diagnosisId }), // 👈 Dịch
                key: 'diag', 
                duration: 3 
            });
            setDiagnosisId("");
        }, 1500);
    };

    // Form gửi phản hồi
    const onFinish = (values) => {
        console.log(values);
        message.success(t("help_msg_feedback_success")); // 👈 Dịch
        form.resetFields();
    };

    // Hàm tạo Card chung với style đồng bộ
    const StyledCard = ({ titleKey, icon, children, style = {} }) => ( // 👈 Dùng key
        <Card 
            title={
                <Space style={{ color: PRIMARY_PURPLE }}>
                    {React.cloneElement(icon, { style: { color: PRIMARY_PURPLE, fontSize: 18 } })}
                    <Text strong style={{ color: PRIMARY_PURPLE }}>{t(titleKey)}</Text> {/* 👈 Dịch */}
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
                {t("help_title")} {/* 👈 Dịch */}
            </Title>
            <Paragraph type="secondary" style={{ marginBottom: 30 }}>
                {t("help_subtitle")} {/* 👈 Dịch */}
            </Paragraph>

            <Row gutter={[24, 24]}>
                
                {/* --- CỘT TRÁI (Tools & Status) --- */}
                <Col xs={24} lg={12}>

                    {/* 1. Công cụ Chẩn đoán nhanh */}
                    <StyledCard titleKey="help_card_diagnosis" icon={<ToolOutlined />}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Text type="secondary">{t("help_text_enter_id")}</Text> {/* 👈 Dịch */}
                            <Input.Group compact>
                                <Input
                                    style={{ width: 'calc(100% - 100px)' }}
                                    placeholder={t("help_input_placeholder")} // 👈 Dịch
                                    prefix={<SearchOutlined />}
                                    value={diagnosisId}
                                    onChange={(e) => setDiagnosisId(e.target.value)}
                                />
                                <Button type="primary" onClick={handleRunDiagnosis} style={{ width: 100 }}>
                                    {t("help_btn_run")} {/* 👈 Dịch */}
                                </Button>
                            </Input.Group>
                        </Space>
                    </StyledCard>
                    
                    <Divider />

                    {/* 2. Trạng thái hệ thống */}
                    <StyledCard titleKey="help_status_title" icon={<ApiOutlined />}>
                        <List
                            dataSource={services}
                            renderItem={(item) => (
                                <List.Item>
                                    <Space>
                                        {item.icon}
                                        <Text strong>{item.name}</Text>
                                    </Space>
                                    <Tag color={item.color} style={{ fontWeight: 600 }}>
                                        {t(`help_status_${item.status_key}`)} {/* 👈 Dịch */}
                                    </Tag>
                                </List.Item>
                            )}
                        />
                    </StyledCard>

                    {/* 3. Cập nhật hệ thống */}
                    <Card
                        title={<Space style={{ color: PRIMARY_PURPLE }}><SyncOutlined style={{ color: PRIMARY_PURPLE, fontSize: 18 }} /> <Text strong style={{ color: PRIMARY_PURPLE }}>{t("help_log_title")}</Text></Space>}
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
                    <StyledCard titleKey="help_card_search" icon={<QuestionCircleOutlined />}>
                        <Search 
                            placeholder={t("help_search_placeholder")} // 👈 Dịch
                            enterButton={t("help_search_btn")} // 👈 Dịch
                            size="large"
                            style={{ marginBottom: 16 }}
                        />
                        
                        <List
                            header={<Text strong>{t("help_faq_header")}</Text>} // 👈 Dịch
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
                    <StyledCard titleKey="help_card_feedback" icon={<MessageOutlined />}>
                        <Form layout="vertical" form={form} onFinish={onFinish}>
                            <Form.Item label={t("help_label_category")} name="category" rules={[{ required: true, message: t("help_msg_select_category") }]}> {/* 👈 Dịch */}
                                <Select placeholder={t("help_placeholder_select_category")}> {/* 👈 Dịch */}
                                    <Option value="bug">{t("help_select_bug")}</Option> {/* 👈 Dịch */}
                                    <Option value="feature">{t("help_select_feature")}</Option> {/* 👈 Dịch */}
                                    <Option value="question">{t("help_select_question")}</Option> {/* 👈 Dịch */}
                                </Select>
                            </Form.Item>
                            
                            <Form.Item label={t("help_label_name")} name="name" rules={[{ required: true, message: t("help_msg_enter_name") }]}> {/* 👈 Dịch */}
                                <Input placeholder={t("help_placeholder_your_name")} /> {/* 👈 Dịch */}
                            </Form.Item>
                            
                            <Form.Item label={t("help_label_content")} name="feedback" rules={[{ required: true, message: t("help_msg_enter_feedback") }]}> {/* 👈 Dịch */}
                                <TextArea rows={3} placeholder={t("help_feedback_placeholder")} /> {/* 👈 Dịch */}
                            </Form.Item>
                            
                            <Button type="primary" htmlType="submit" block>
                                {t("help_btn_submit")} {/* 👈 Dịch */}
                            </Button>
                        </Form>
                    </StyledCard>
                    
                    <Divider />

                    {/* 6. Liên hệ kỹ thuật */}
                    <Card
                        title={
                            <Space style={{ color: PRIMARY_PURPLE }}>
                                <PhoneOutlined style={{ color: PRIMARY_PURPLE, fontSize: 18 }} /> 
                                <Text strong style={{ color: PRIMARY_PURPLE }}>{t("help_card_contact")}</Text> {/* 👈 Dịch */}
                            </Space>
                        }
                        style={{ marginTop: 24, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                        bordered={false}
                    >
                        {/* Nâng cấp Bố cục: Dùng Row/Col cho Email và Hotline */}
                        <Row gutter={[16, 16]}>
                            {/* Thẻ Email */}
                            <Col xs={24} sm={12}>
                                <Card 
                                    size="small" 
                                    style={{ 
                                        backgroundColor: '#f6ffed', 
                                        borderLeft: '4px solid #52c41a', 
                                    }}
                                    bordered={false}
                                >
                                    <Paragraph style={{ margin: 0 }}>
                                        <Text type="secondary" style={{ display: 'block' }}>{t("help_contact_email")}</Text> {/* 👈 Dịch */}
                                        <Text strong><MailOutlined style={{ marginRight: 6 }} /> bamin.com</Text>
                                    </Paragraph>
                                </Card>
                            </Col>

                            {/* Thẻ Hotline */}
                            <Col xs={24} sm={12}>
                                <Card 
                                    size="small" 
                                    style={{ 
                                        backgroundColor: '#e6f4ff', 
                                        borderLeft: '4px solid #1677ff', 
                                    }}
                                    bordered={false}
                                >
                                    <Paragraph style={{ margin: 0 }}>
                                        <Text type="secondary" style={{ display: 'block' }}>{t("help_contact_hotline")}</Text> {/* 👈 Dịch */}
                                        <Text strong style={{ color: '#1677ff' }}><PhoneOutlined style={{ marginRight: 6 }} /> 8888 9999</Text>
                                    </Paragraph>
                                </Card>
                            </Col>
                        </Row>
                        
                        <Divider style={{ margin: '16px 0 8px 0' }} />

                        {/* Thời gian hỗ trợ */}
                        <Paragraph style={{ margin: 0 }}>
                            <Text type="secondary">{t("help_contact_time")}</Text> {/* 👈 Dịch */}
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