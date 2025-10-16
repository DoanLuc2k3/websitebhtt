import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory } from "../../API";

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInventory().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Quản lý kho</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Ảnh sản phẩm",
            dataIndex: "thumbnail",
            render: (link) => {
              return <Avatar src={link} />;
            },
          },
          {
            title: "Tên sản phẩm",
            dataIndex: "title",
          },
          {
            title: "Giá",
            dataIndex: "price",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Đánh giá",
            dataIndex: "rating",
            render: (rating) => {
              return <Rate value={rating} allowHalf disabled />;
            },
          },
          {
            title: "Tồn kho",
            dataIndex: "stock",
          },

          {
            title: "Thương hiệu",
            dataIndex: "brand",
          },
          {
            title: "Danh mục",
            dataIndex: "category",
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
export default Inventory;
