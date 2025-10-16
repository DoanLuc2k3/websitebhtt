import { BellFilled, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { getComments, getOrders } from "../../API";

function AppHeader() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  return (
    <div className="AppHeader">
      <div className="header-left">
        <Image width={40} src="https://i.imgur.com/AUPzhaY.png"></Image>
        <Typography.Title level={3} style={{ margin: 0 }}>
          <span className="logo-title">L-M Dashboard</span>
        </Typography.Title>
      </div>

      <div className="header-center">
        <Input.Search placeholder="Type here..." style={{ width: 360, borderRadius: 20 }} />
      </div>

      <div className="header-right">
        <Space>
          <Badge count={comments.length} dot>
            <MailOutlined
              style={{ fontSize: 22,paddingRight: '10px'}}
              onClick={() => {
                setCommentsOpen(true);
              }}
            />
          </Badge>
          <Badge count={orders.length} dot>
            <BellFilled
              style={{ fontSize: 22 }}
              onClick={() => {
                setNotificationsOpen(true);
              }}
            />
          </Badge>
          <Button  type="link" icon={<UserOutlined />} style={{fontSize:'bold'}}>Admin</Button>
        </Space>
      </div>
      <Drawer
        title="Comments"
        open={commentsOpen}
        onClose={() => {
          setCommentsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>;
          }}
        ></List>
      </Drawer>
      <Drawer
        title="Notifications"
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={orders}
          renderItem={(item) => {
            return (
              <List.Item>
                <Typography.Text strong>{item.title}</Typography.Text> has been
                ordered!
              </List.Item>
            );
          }}
        ></List>
      </Drawer>
    </div>
  );
}
export default AppHeader;
