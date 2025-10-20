import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  DashboardOutlined, // ✅ Thêm icon Dashboard
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory, getOrders, getRevenue } from "../../API";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.total);
      setRevenue(res.discountedTotal);
    });
    getInventory().then((res) => {
      setInventory(res.total);
    });
    getCustomers().then((res) => {
      setCustomers(res.total);
    });
  }, []);

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
      {/* --- Tiêu đề có icon --- */}
      <Typography.Title
        level={3}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
         
          marginBottom: "0",
        }}
      >
        <DashboardOutlined
          style={{
            color: "white",
            backgroundColor: "purple",
            borderRadius: "50%",
            padding: 8,
            fontSize: 20,
          }}
        
        />
        <span style={{ fontWeight: "600" }}>Tổng quan</span>
      </Typography.Title>

      {/* --- Dãy thống kê --- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "20px",
        }}
      >
        <DashboardCard
          icon={
            <ShoppingCartOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Đơn hàng"}
          value={orders}
        />
        <DashboardCard
          icon={
            <ShoppingOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Quản lý kho"}
          value={inventory}
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Khách hàng"}
          value={customers}
        />
        <DashboardCard
          icon={
            <DollarCircleOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Tổng doanh thu"}
          value={revenue}
        />
      </div>

      {/* --- Biểu đồ và đơn hàng gần đây --- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <RecentOrders />
        <DashboardChart />
      </div>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card
      style={{
        borderRadius: 16,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function RecentOrders() {
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

  return (
    <Card
      title="🛒 Đơn hàng gần đây"
      style={{
        borderRadius: 16,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <Table
        columns={[
          { title: "Tên sản phẩm", dataIndex: "title" },
          { title: "Số lượng", dataIndex: "quantity" },
          { title: "Đơn giá", dataIndex: "discountedPrice" },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
        size="middle"
      />
    </Card>
  );
}

function DashboardChart() {
  const [reveneuData, setReveneuData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.map((cart) => `User-${cart.userId}`);
      const data = res.carts.map((cart) => cart.discountedTotal);

      setReveneuData({
        labels,
        datasets: [
          {
            label: "Doanh thu",
            data,
            backgroundColor: "rgba(255, 99, 132, 0.7)",
            borderRadius: 6,
          },
        ],
      });
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: {
        display: true,
        text: "📊 Doanh thu đơn hàng",
        font: { size: 16, weight: "bold" },
      },
    },
  };

  return (
    <Card
      style={{
        borderRadius: 16,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <Bar options={options} data={reveneuData} />
    </Card>
  );
}

export default Dashboard;
