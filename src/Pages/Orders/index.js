import { Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getOrders } from "../../API";

function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  return (
    <Space size={20} direction="vertical" style={{ width: '100%' }}>
      <Typography.Title level={4}>Đơn hàng</Typography.Title>
      <div style={{ width: '100%' }}>
        <Table
          loading={loading}
          columns={[
            {
              title: "Tên sản phẩm",
              dataIndex: "title",
              width: 300,
            },
            {
              title: "Giá",
              dataIndex: "price",
              render: (value) => <span>${value}</span>,
              width: 140,
            },
            {
              title: "Giảm giá",
              dataIndex: "discountedPrice",
              render: (value) => <span>${value}</span>,
              width: 140,
            },
            {
              title: "Số lượng",
              dataIndex: "quantity",
              width: 100,
            },
            {
              title: "Tổng",
              dataIndex: "total",
              width: 140,
            },
          ]}
          dataSource={dataSource}
          pagination={{ pageSize: 5 }}
          style={{ width: '100%' }}
          scroll={{ x: '100%' }}
        />
      </div>
    </Space>
  );
}
export default Orders;
