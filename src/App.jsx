import * as React from "react"; // นำเข้าโมดูลทั้งหมดที่ต้องการจาก React, ให้เราสามารถใช้งานฟีเจอร์ต่างๆ ของ React
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import ProtectedRoutesSupper from "./components/auth/ProtectedRoutesSupper";
import Login from "./pages/Login";
import Navbar from "./components/navbar/Navbar";
import Process_STD_Leasdtime_Master from "./pages/Process_STD_Leasdtime_Master";
import Product_Routing_No_STD_LT from "./pages/Product_Routing_No_STD_LT";

export default function App() {
  
  return (
    
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<Navbar />} />
              <Route path="/proc_std_lt_master" element={<Process_STD_Leasdtime_Master />}/>
              <Route path="/prod_rout_no_std_lt" element={<Product_Routing_No_STD_LT />}/>
              {/* <Route path="/fixed_page_commit_leadtime" element={<Fixed_Page_Commit_Leadtime />}/>
              <Route path="/fixed_page_upload_master" element={<Fixed_Page_Upload_Master />}/>
              <Route path="/fixed_page_list_products_routing" element={<Fixed_Page_List_Products_Routing />}/> */}
            </Route>
        </Routes>
  );
}
