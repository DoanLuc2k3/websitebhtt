import React, { useEffect, useState } from "react";
import {
    Card,
    Space,
    Typography,
    Flex,
    Tag,
    Table,
    Button,
    Row,
    Col,
    Tooltip,
    List, 
    Avatar, 
    Progress, 
} from "antd";
import {
    LineChartOutlined,
    DollarOutlined,
    UserAddOutlined,
    ArrowUpOutlined,
    FireOutlined,
    TrophyOutlined,
    ShoppingCartOutlined,
    EyeOutlined,
    CrownOutlined, 
    UserOutlined, 
} from "@ant-design/icons";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip as ChartTooltip,
    Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

// Đăng ký các thành phần Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    ChartTooltip,
    Legend
);

const { Title: AntTitle, Text } = Typography;

// =========================================================
// MOCK DATA VÀ MOCK API
// =========================================================

const mockRevenueData = {
    monthly: [15000, 22000, 31000, 28000, 45000, 52000, 60000, 68000, 85000, 75000, 92000, 105000],
    products: [
        { name: 'Áo Khoác', sales: 52000, count: 210 },
        { name: 'Túi Xách', sales: 41000, count: 180 },
        { name: 'Giày Sneaker', sales: 35000, count: 150 },
        { name: 'Phụ kiện', sales: 18000, count: 90 },
    ],
    growthRate: 12,
    newCustomers: 1000000,
    totalRevenue: 10000,
};

const getCustomers = () => Promise.resolve({
    users: [
        { id: 1, firstName: "Doãn", lastName: "Bá Lực" },
        { id: 2, firstName: "Doãn", lastName: "Bá Min" },
        { id: 3, firstName: "Lê", lastName: "Văn C" },
        { id: 4, firstName: "Phạm", lastName: "Thị D" },
        { id: 5, firstName: "Hoàng", lastName: "Văn E" },
    ],
});
const getOrders = () => Promise.resolve({
    products: [
        { id: 1, title: 'Áo Guci', quantity: 1, discountedPrice: 2500 },
        { id: 2, title: 'Túi xách', quantity: 2, discountedPrice: 2500 },
        { id: 3, title: 'Giày Sneaker', quantity: 1, discountedPrice: 7000 },
        { id: 4, title: 'Quần Jean', quantity: 3, discountedPrice: 750 },
    ]
});


// =========================================================
// 1. Component Card Thống kê Chính (StatCard - KẾT HỢP ANIMATION)
// =========================================================

function StatCard({ title, value, icon, color, bg, growth = null, animationDelay = '0s' }) { 
    
    // Tính toán độ trễ FLOAT animation
    const floatDelay = `calc(0.5s + ${animationDelay})`; 
    
    const renderValue = () => {
        if (growth !== null) {
            return (
                <Flex align="center" gap={10}>
                    <AntTitle level={3} style={{ margin: 0, color: '#333', fontWeight: 800 }}>
                        {value}
                    </AntTitle>
                    <Tag 
                        color={growth >= 0 ? 'green' : 'red'} 
                        icon={growth >= 0 ? <ArrowUpOutlined /> : <ArrowUpOutlined style={{ transform: 'rotate(180deg)' }} />}
                        style={{ fontWeight: 600, padding: '4px 8px', fontSize: 13 }}
                    >
                        {Math.abs(growth)}%
                    </Tag>
                </Flex>
            );
        }
        
        return (
            <AntTitle level={3} style={{ margin: 0, color: '#333', fontWeight: 800 }}>
                {value}
            </AntTitle>
        );
    };

    const cardStyle = {
        borderRadius: 16,
        background: bg,
        overflow: 'hidden',
        transition: 'all 0.3s ease-out',
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)", 
        minHeight: '120px', 
        opacity: 0,
        
        willChange: 'transform, opacity',
        
        animation: 
            `revealAnimation 0.5s ease-out ${animationDelay} forwards, ` + 
            `floatAnimation 4s ease-in-out ${floatDelay} infinite`, 
    };

    return (
        <Card
            bordered={false}
            style={cardStyle}
        >
            <Flex justify="space-between" align="flex-start">
                <Space direction="vertical" size={4}>
                    <Text style={{ color: color, fontWeight: 700, textTransform: 'uppercase', fontSize: 13 }}>
                        {title}
                    </Text>
                    
                    {renderValue()}
                </Space>

                <div style={{ fontSize: 40, color: color + 'AA', opacity: 0.5 }}>
                    {icon}
                </div>
            </Flex>
        </Card>
    );
}

// =========================================================
// 2. Biểu đồ Đường (MonthlyRevenueChart) - Giữ nguyên
// =========================================================

function MonthlyRevenueChart({ data }) {
    const labels = ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"];
    
    const chartData = {
        labels,
        datasets: [
            {
                label: 'Doanh thu (VNĐ)',
                data: data.monthly,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: 'rgb(255, 99, 132)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: '📈 Doanh thu theo tháng (VNĐ)', font: { size: 16, weight: 'bold' } },
        },
        scales: {
            y: { beginAtZero: true, title: { display: true, text: 'VNĐ' } },
        },
    };

    return (
        <Card title="Phân tích Doanh thu" bordered={false} style={{ borderRadius: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <div style={{ height: '300px' }}>
                <Line options={options} data={chartData} />
            </div>
        </Card>
    );
}

// =========================================================
// 3. Biểu đồ Cột (BestSellingProductsChart) - Giữ nguyên
// =========================================================

function BestSellingProductsChart({ data }) {
    const labels = data.products.map(p => p.name);
    const salesData = data.products.map(p => p.sales);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Doanh thu',
                data: salesData,
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        indexAxis: 'y',
        plugins: {
            legend: { display: false },
            title: { display: true, text: '🔥 Sản phẩm bán chạy nhất', font: { size: 16, weight: 'bold' } },
        },
        scales: {
            x: { beginAtZero: true, title: { display: true, text: 'Doanh thu (VNĐ)' } },
        },
    };

    return (
        <Card title="Hiệu suất Sản phẩm" bordered={false} style={{ borderRadius: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <div style={{ height: '300px' }}>
                <Bar options={options} data={chartData} />
            </div>
        </Card>
    );
}

// =========================================================
// 4. Khách hàng Chi tiêu Cao nhất (TopCustomersRanking - MỚI & CHUYÊN NGHIỆP)
// =========================================================

function TopCustomersRanking() {
    const [topCustomers, setTopCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [maxSpending, setMaxSpending] = useState(0); 

    useEffect(() => {
        getCustomers().then(res => {
            const customersWithSpending = res.users.slice(0, 5).map(user => ({
                ...user,
                // Dữ liệu chi tiêu ngẫu nhiên
                totalSpending: Math.floor(Math.random() * 50000000) + 10000000, 
            })).sort((a, b) => b.totalSpending - a.totalSpending);

            setMaxSpending(customersWithSpending[0]?.totalSpending || 1);
            setTopCustomers(customersWithSpending);
            setLoading(false);
        });
    }, []);

    // Danh sách huy chương cho Top 3
    const rankIcons = [
        <CrownOutlined style={{ color: '#ffc53d', fontSize: 22 }} />,
        <CrownOutlined style={{ color: '#d9d9d9', fontSize: 18 }} />,
        <CrownOutlined style={{ color: '#ff7875', fontSize: 16 }} />,
    ];

    // ✅ Thêm hàm định dạng tiền tệ
    const formatCurrency = (amount) => {
        // Chỉ giữ lại 2 chữ số sau dấu chấm nếu là tiền triệu hoặc tỷ 
        // Sau đó thay thế bằng đơn vị 'Tr VNĐ' hoặc 'Tỷ VNĐ' cho gọn
        if (amount >= 1000000000) {
            return (amount / 1000000000).toFixed(2) + ' Tỷ VNĐ';
        }
        if (amount >= 1000000) {
            return (amount / 1000000).toFixed(2) + ' Tr VNĐ';
        }
        return amount.toLocaleString('vi-VN') + ' VNĐ';
    };

    return (
        <Card 
            title={<Space><TrophyOutlined style={{ color: '#ffc53d' }} /> Khách hàng chi tiêu cao</Space>} 
            bordered={false} 
            style={{ 
                borderRadius: 16, 
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)", 
                height: '100%',
            }}
            loading={loading}
        >
            <List
                itemLayout="horizontal"
                dataSource={topCustomers}
                renderItem={(item, index) => {
                    const progressPercent = Math.round((item.totalSpending / maxSpending) * 100);
                    return (
                        <List.Item style={{ padding: '12px 0' }}>
                            {/* ✅ Điều chỉnh Flex để kiểm soát tốt hơn chiều rộng */}
                            <Flex align="center" style={{ width: '100%' }}>
                                {/* 1. RANKING ICON (Width: 30px) */}
                                <div style={{ minWidth: 30, textAlign: 'center' }}>
                                    {index < 3 ? rankIcons[index] : <Typography.Text type="secondary">{index + 1}</Typography.Text>}
                                </div>
                                
                                {/* 2. AVATAR và TÊN (Width: Cố định 160px để tránh bị kéo dãn) */}
                                <List.Item.Meta
                                    avatar={
                                        <Avatar 
                                            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${item.firstName}`} 
                                            icon={<UserOutlined />}
                                            style={{ backgroundColor: index < 3 ? '#ffc53d33' : '#f5f5f5' }}
                                        />
                                    }
                                    title={<Typography.Text strong ellipsis>{item.firstName} {item.lastName}</Typography.Text>}
                                    description={<Typography.Text type="secondary" style={{ fontSize: 12 }}>Tổng chi tiêu</Typography.Text>}
                                    // ✅ Xóa flexGrow: 1 và thiết lập chiều rộng cố định/tối đa
                                    style={{ width: '160px', minWidth: '160px', paddingRight: '10px' }}
                                />
                                
                                {/* 3. THANH TIẾN TRÌNH & SỐ TIỀN (Width: Phần còn lại) */}
                                {/* ✅ Thay đổi minWidth để dễ quản lý hơn, và để nó tự lấp đầy không gian còn lại */}
                                <Flex direction="column" align="flex-end" style={{ flexGrow: 1, minWidth: '100px' }}>
                                    <Typography.Text strong style={{ color: index === 0 ? '#fa8c16' : '#850a0aff', fontSize: 13 }}>
                                        {formatCurrency(item.totalSpending)} {/* ✅ Dùng hàm định dạng mới */}
                                    </Typography.Text>
                                    <Tooltip title={`Chiếm ${progressPercent}% so với Khách hàng Top 1`}>
                                        <Progress 
                                            percent={progressPercent} 
                                            showInfo={false} 
                                            strokeColor={index === 0 ? '#ffc53d' : '#850a0aff'}
                                            size="small"
                                            style={{ width: '100%', marginTop: 2 }}
                                        />
                                    </Tooltip>
                                </Flex>
                            </Flex>
                        </List.Item>
                    );
                }}
            />
        </Card>
    );
}

// =========================================================
// 5. Component Đơn hàng Gần đây (RecentOrdersTable) - ĐÃ TỐI ƯU HÓA
// =========================================================
function RecentOrdersTable() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getOrders().then((res) => {
            const items = (res.products || [])
                .slice(0, 4)
                .map((p) => ({ ...p, key: p.id ?? p.title }));
            setDataSource(items);
            setLoading(false);
        });
    }, []);

    const columns = [
        { 
            // 1. Tên sản phẩm: Chiếm 45% (Tăng thêm 5% để chắc chắn)
            title: "Tên sản phẩm", 
            dataIndex: "title", 
            width: '45%', 
            align: 'left',
            render: (text) => <Typography.Text strong>{text}</Typography.Text>,
            // Tối ưu tiêu đề cột (Header)
            onHeaderCell: () => ({ style: { fontSize: 13, padding: '10px 6px' } }), 
        },
        { 
            // 2. Số lượng: Chiếm 15%
            title: "Số lượng", 
            dataIndex: "quantity", 
            width: '15%', 
            align: 'center', 
            onHeaderCell: () => ({ style: { fontSize: 13, padding: '10px 6px' } }), 
        },
        {
            // 3. Đơn giá (VNĐ): Chiếm 25%
            title: "Đơn giá",
            dataIndex: "discountedPrice",
            width: '25%', 
            align: 'right', 
            render: (v) => v.toLocaleString("vi-VN"),
            onHeaderCell: () => ({ style: { fontSize: 13, padding: '10px 6px' } }), 
        },
        {
            // 4. Hành động: Chiếm 15% (Đủ cho nút 'Chi tiết')
            title: "Hành động",
            width: '15%', 
            align: 'right', 
            render: () => (
                <Tooltip title="Xem chi tiết đơn hàng">
                    <Button
                        size="small"
                        type="link"
                        icon={<EyeOutlined />}
                    >
                        Chi tiết
                    </Button>
                </Tooltip>
            ),
            onHeaderCell: () => ({ style: { fontSize: 13, padding: '10px 6px' } }), 
        },
    ];

    return (
        <Card 
            title={<Space><ShoppingCartOutlined /> Đơn hàng gần đây</Space>} 
            bordered={false} 
            style={{ 
                borderRadius: 16, 
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)", 
                height: '100%',
                // ✅ Thêm overflow: 'hidden' để ngăn nội dung bảng tràn ra ngoài Card
                overflow: 'hidden' 
            }}
            bodyStyle={{ padding: '0 5px 10px 5px' }} // ✅ Giảm padding body Card
        >
            {/* ✅ CSS cục bộ để tùy chỉnh toàn bộ bảng */}
            <style>
                {`
                /* Quan trọng: Ngăn tiêu đề cột bị xuống dòng */
                .ant-table-thead > tr > th {
                    white-space: nowrap; 
                    padding: 10px 5px !important; /* Giảm padding tiêu đề */
                }
                /* Giảm padding cho nội dung bảng để tiết kiệm không gian */
                .ant-table-tbody > tr > td {
                    padding: 8px 5px !important; 
                }
                `}
            </style>
            
            <Table
                loading={loading}
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                size="middle"
                // Tùy chỉnh header cell (Không cần dùng components nếu dùng style tag)
            />
        </Card>
    );
}
// =========================================================
// 6. Component Chính: RevenueReports
// =========================================================

function RevenueReports() {
    
    const totalRevenueFormatted = mockRevenueData.totalRevenue.toLocaleString('vi-VN');

    return (
        <Space
            direction="vertical"
            size={24}
            style={{
                width: "100%",
                padding: "24px",
                background: "#f5f7fa",
                borderRadius: "12px",
            }}
        >
            {/* --- HEADER --- */}
            <AntTitle level={3} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <LineChartOutlined style={{ color: '#fff', backgroundColor: 'Green', borderRadius: '50%', padding: 10, fontSize: 24, boxShadow: '0 4px 10px rgba(235, 47, 150, 0.4)' }} />
                <span style={{ fontWeight: 700 }}>Tổng quan</span>
            </AntTitle>

            {/* --- STATISTIC CARDS (Tối ưu hóa) --- */}
            <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        title="Tổng doanh thu"
                        value={`${totalRevenueFormatted} VNĐ`}
                        icon={<DollarOutlined />}
                        color="#00b96b"
                        bg="linear-gradient(135deg, #e6fffb, #b5f5ec)"
                        animationDelay="0.1s" 
                    />
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        title="Tăng trưởng"
                        value={`+${mockRevenueData.growthRate}%`}
                        icon={<LineChartOutlined />}
                        color="#1677ff"
                        bg="linear-gradient(135deg, #f0f5ff, #adc6ff)"
                        growth={mockRevenueData.growthRate}
                        animationDelay="0.2s" 
                    />
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        title="Khách hàng"
                        value={mockRevenueData.newCustomers.toLocaleString('vi-VN')}
                        icon={<UserAddOutlined />}
                        color="#722ed1"
                        bg="linear-gradient(135deg, #f9f0ff, #d3adf7)"
                        animationDelay="0.3s" 
                    />
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        title="Sản phẩm bán chạy"
                        value={mockRevenueData.products[0].name}
                        icon={<FireOutlined />}
                        color="#ff4d4f"
                        bg="linear-gradient(135deg, #fff1f0, #ffa39e)"
                        animationDelay="0.4s" 
                    />
                </Col>
            </Row>

            {/* --- CHARTS & RANKING LIST --- */}
            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <Space direction="vertical" size={24} style={{ width: '100%' }}>
                        <MonthlyRevenueChart data={mockRevenueData} />
                        <BestSellingProductsChart data={mockRevenueData} />
                    </Space>
                </Col>
                
                <Col xs={24} lg={8}>
                    <Space direction="vertical" size={24} style={{ width: '100%' }}>
                        {/* ✅ SỬ DỤNG COMPONENT MỚI */}
                        <TopCustomersRanking /> 
                        <RecentOrdersTable /> 
                    </Space>
                </Col>
            </Row>
            
        </Space>
    );
}

export default RevenueReports;