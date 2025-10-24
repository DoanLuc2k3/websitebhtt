import "./App.css";
import AppFooter from "./Components/AppFooter";
import AppHeader from "./Components/AppHeader";
import PageContent from "./Components/PageContent";
import SideMenu from "./Components/SideMenu";
import { useState } from "react"; 

function App() {
  // ✅ 1. SỬ DỤNG TÊN STATE CHUẨN ĐỂ DỄ ĐỒNG BỘ VỚI CÁC FILES KHÁC
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  // 🔴 Hàm Toggle Menu (để truyền xuống tất cả các thành phần)
  const toggleSideMenu = () => {
    setIsSideMenuOpen(prev => !prev);
  };
  
  return (
    <div className="App">
      {/* 2. TRUYỀN HÀM TOGGLE XUỐNG HEADER */}
      <AppHeader 
        // Header chỉ cần hàm toggle để nút Hamburger hoạt động
        toggleSideMenu={toggleSideMenu} 
      />
      
      <div className="SideMenuAndPageContent">
        {/* 3. TRUYỀN STATE VÀ HÀM TOGGLE XUỐNG SIDE MENU */}
        <SideMenu 
          isSideMenuOpen={isSideMenuOpen} // Truyền trạng thái hiện tại
          toggleSideMenu={toggleSideMenu} // SideMenu sẽ dùng hàm này để tự đóng khi click
        />
        <PageContent></PageContent>
      </div>
      
      <AppFooter />

      {/* 4. THÊM LỚP PHỦ (BACKDROP) */}
      {/* Sử dụng tên class đã dùng trong CSS: .menu-overlay */}
      {isSideMenuOpen && (
        <div 
          className="menu-overlay" 
          onClick={toggleSideMenu} // Click vào overlay sẽ đóng menu
        />
      )}
    </div>
  );
}
export default App;