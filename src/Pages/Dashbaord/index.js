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
import {  getCustomers, getOrders } from "../../API";

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

// MOCK DATA API (Giả lập dữ liệu)
const mockRevenueData = {
    monthly: [15000, 22000, 31000, 28000, 45000, 52000, 60000, 68000, 85000, 75000, 92000, 105000],
    products: [
        { name: 'Áo Khoác', sales: 52000, count: 210 },
        { name: 'Túi Xách', sales: 41000, count: 180 },
        { name: 'Giày Sneaker', sales: 35000, count: 150 },
        { name: 'Phụ kiện', sales: 18000, count: 90 },
    ],
    growthRate: 12.5,
    newCustomers: 45,
    totalRevenue: 805000,
};

// =========================================================
// 1. Component Card Thống kê Chính (StatCard - ĐÃ CÂN CHỈNH NỘI DUNG)
// =========================================================

function StatCard({ title, value, icon, color, bg, growth = null, extraStyle = {} }) {
    const [isHovered, setIsHovered] = useState(false);
    
    // Tùy chỉnh giá trị hiển thị để tránh bị lệch dòng
    const renderValue = () => {
        if (growth !== null) {
            //  Dùng AntTitle cho Giá trị
            return (
                <Flex align="center" gap={10}>
                    <AntTitle level={3} style={{ margin: 0, color: '#333', fontWeight: 800 }}>
                        {value}
                    </AntTitle>
                    {/*  Đưa Tag tăng trưởng vào cùng hàng */}
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
        
        // Dùng AntTitle cho các giá trị bình thường
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
        ...extraStyle,
        boxShadow: isHovered 
            ? "0 10px 25px rgba(0,0,0,0.2)" 
            : "0 4px 16px rgba(0,0,0,0.08)",
        transform: isHovered 
            ? `translateY(${extraStyle.transform ? parseFloat(extraStyle.transform.replace('translateY(', '')) - 5 : -5}px)`
            : extraStyle.transform || 'translateY(0px)',
        //  Đặt chiều cao cố định để tất cả thẻ đều nhau (Dựa trên thẻ phức tạp nhất)
        minHeight: '120px', 
    };

    return (
        <Card
            bordered={false}
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Flex justify="space-between" align="flex-start">
                <Space direction="vertical" size={4}>
                    <Text style={{ color: color, fontWeight: 700, textTransform: 'uppercase', fontSize: 13 }}>
                        {title}
                    </Text>
                    
                    {renderValue()}
                    
                    {/* Phần tăng trưởng tag đã được tích hợp vào renderValue */}
                </Space>

                <div style={{ fontSize: 40, color: color + 'AA', opacity: 0.5 }}>
                    {icon}
                </div>
            </Flex>
        </Card>
    );
}

// =========================================================
// 2. Biểu đồ Đường (MonthlyRevenueChart)
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
// 3. Biểu đồ Cột (BestSellingProductsChart)
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
// 4. Khách hàng Chi tiêu Cao nhất (TopCustomersTable)
// =========================================================

function TopCustomersTable() {
    const [topCustomers, setTopCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCustomers().then(res => {
            const customersWithSpending = res.users.slice(0, 5).map(user => ({
                ...user,
                totalSpending: Math.floor(Math.random() * 500000) + 100000,
            })).sort((a, b) => b.totalSpending - a.totalSpending);

            setTopCustomers(customersWithSpending);
            setLoading(false);
        });
    }, []);

    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => <Text strong style={{ color: index < 3 ? '#ffc53d' : '#333' }}>{index + 1}</Text>,
            width: 50,
        },
        {
            title: 'Khách hàng',
            dataIndex: 'firstName',
            key: 'name',
            render: (text, record) => <Text>{record.firstName} {record.lastName}</Text>,
        },
        {
            title: 'Tổng chi tiêu (VNĐ)',
            dataIndex: 'totalSpending',
            key: 'spending',
            align: 'right',
            render: (spending) => <Text strong style={{ color: '#eb2f96' }}>{spending.toLocaleString('vi-VN')}</Text>,
        },
    ];

    return (
        <Card title={<Space><TrophyOutlined style={{ color: '#ffc53d' }} /> Khách hàng chi tiêu cao</Space>} bordered={false} style={{ borderRadius: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <Table
                loading={loading}
                columns={columns}
                dataSource={topCustomers}
                pagination={false}
                size="middle"
            />
        </Card>
    );
}

// =========================================================
// 5. Component Đơn hàng Gần đây (RecentOrdersTable)
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
            title: "Tên sản phẩm", 
            dataIndex: "title", 
            width: '30%',
            align: 'left',
        },
        { 
            title: "Số lượng", 
            dataIndex: "quantity", 
            width: '20%',
            align: 'center', 
        },
        {
            title: "Đơn giá (VNĐ)",
            dataIndex: "discountedPrice",
            width: '30%',
            align: 'right', 
            render: (v) => v.toLocaleString("vi-VN"),
        },
        {
            title: "Hành động",
            width: '20%',
            align: 'center', 
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
        },
    ];

    return (
        <Card 
            title={<Space><ShoppingCartOutlined /> Đơn hàng gần đây</Space>} 
            bordered={false} 
            style={{ borderRadius: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.05)", height: '100%' }}
        >
            <Table
                loading={loading}
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                size="middle"
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

            {/* --- STATISTIC CARDS (Đã áp dụng hiệu ứng dịch chuyển và hover) --- */}
            <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        title="Tổng doanh thu"
                        value={`${totalRevenueFormatted} VNĐ`}
                        icon={<DollarOutlined />}
                        color="#00b96b"
                        bg="linear-gradient(135deg, #e6fffb, #b5f5ec)"
                        extraStyle={{ transform: 'translateY(-10px)' }} // Thẻ 1: Dịch chuyển lên
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
                        extraStyle={{ transform: 'translateY(0px)' }} // Thẻ 2: Ở vị trí ban đầu
                    />
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        title="Khách hàng"
                        value={mockRevenueData.newCustomers}
                        icon={<UserAddOutlined />}
                        color="#722ed1"
                        bg="linear-gradient(135deg, #f9f0ff, #d3adf7)"
                        extraStyle={{ transform: 'translateY(-10px)' }} // Thẻ 3: Dịch chuyển lên
                    />
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        title="Sản phẩm bán chạy nhất"
                        value={mockRevenueData.products[0].name}
                        icon={<FireOutlined />}
                        color="#ff4d4f"
                        bg="linear-gradient(135deg, #fff1f0, #ffa39e)"
                        extraStyle={{ transform: 'translateY(0px)' }} // Thẻ 4: Ở vị trí ban đầu
                    />
                </Col>
            </Row>

            {/* --- CHARTS & TWO TABLES --- */}
            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <Space direction="vertical" size={24} style={{ width: '100%' }}>
                        <MonthlyRevenueChart data={mockRevenueData} />
                        <BestSellingProductsChart data={mockRevenueData} />
                    </Space>
                </Col>
                
                <Col xs={24} lg={8}>
                    <Space direction="vertical" size={24} style={{ width: '100%' }}>
                        <TopCustomersTable /> 
                        <RecentOrdersTable /> 
                    </Space>
                </Col>
            </Row>
            
        </Space>
    );
}

export default RevenueReports;