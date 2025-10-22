import { Route, Routes } from "react-router-dom";
import Customers from "../../Pages/Customers";
import Dashboard from "../../Pages/Dashbaord";
import Inventory from "../../Pages/Inventory";
import Orders from "../../Pages/Orders";
import Help  from "../../Pages/Help";
import Staffs from "../../Pages/Staffs";
import Promotion from "../../Pages/Promotion";



function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
      <Route path="/help" element={<Help />}></Route>
      <Route path="/staffs" element={<Staffs />}></Route>
      <Route path="/promotion" element={<Promotion />}></Route>
    </Routes>
  );
}
export default AppRoutes;
