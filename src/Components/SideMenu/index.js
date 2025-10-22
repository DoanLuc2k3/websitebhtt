import {
 AppstoreOutlined,
 QuestionCircleOutlined,
 ShopOutlined,
 ShoppingCartOutlined,
 UserOutlined,
 TeamOutlined,
 TagOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const DARK_BACKGROUND = "#001529";

function SideMenu() {
const location = useLocation();
const [selectedKeys, setSelectedKeys] = useState("/");
 useEffect(() => {
 const pathName = location.pathname;
 setSelectedKeys(pathName);
 }, [location.pathname]);

 const navigate = useNavigate();

 return (

 <div
className="SideMenu"
style={{
 background: DARK_BACKGROUND,
 height: "100vh",
 display: "flex",
 flexDirection: "column",
       
        position: "sticky",
        top: 0,
}}
>
 <Menu
 className="SideMenuVertical"

 theme="dark"

 style={{ background: "transparent", borderRight: 0 }}
 mode="vertical"
onClick={(item) => {
 navigate(item.key);
}}
 selectedKeys={[selectedKeys]}
 items={[

{

 label: "Tổng quan",

 icon: <AppstoreOutlined style={{color: "green"}} />,

 key: "/",

 },



{

 label: "Quản lý kho",

 key: "/inventory",

 icon: <ShopOutlined style={{ color: "#fa8c16" }} />, // Cam

 },

{

label: "Đơn hàng",

 key: "/orders",

icon: <ShoppingCartOutlined style={{color: "red"}}/>,

},

 {

label: "Nhân viên",

 key: "/staffs",



 icon: <TeamOutlined style={{ color: "Teal" }} />,

},

{

 label: "Khách hàng",

 key: "/customers",

icon: <UserOutlined style={{color : "#FCD9C4"}}/>,

 },

{

 label: "Marketing & Khuyến mãi",

 key: "/promotion",

 icon: <TagOutlined style={{color : "Maroon"}}/>,

},

{

label: "Hỗ trợ",

key: "/help",

 icon: <QuestionCircleOutlined style={{color: "blue"}}/>,
            
 style: { marginTop: 'auto' } 

 },
 ]}
 />
 </div>
 );
}
export default SideMenu;