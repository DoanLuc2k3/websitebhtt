import "./App.css";
import AppFooter from "./Components/AppFooter";
import AppHeader from "./Components/AppHeader";
import PageContent from "./Components/PageContent";
import SideMenu from "./Components/SideMenu";
import React, { useState, Suspense, useEffect, useCallback } from "react"; // 👈 Thêm useEffect, useCallback
import "./i18n"; // 👈 IMPORT FILE I18N MỚI

// KEY LƯU TRỮ DARK MODE
const DARK_MODE_KEY = "app_dark_mode";

function App() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // 👈 State quản lý Dark Mode

  // 1. Đọc trạng thái Dark Mode từ localStorage khi component mount
  useEffect(() => {
    const savedMode = localStorage.getItem(DARK_MODE_KEY);
    // Lưu ý: localStorage lưu string "true" hoặc "false"
    if (savedMode !== null) {
      setIsDarkMode(savedMode === "true");
    }
  }, []);

  // 2. Hàm chuyển đổi và lưu trạng thái Dark Mode
  const handleToggleDarkMode = useCallback((newMode) => {
    setIsDarkMode(newMode);
    localStorage.setItem(DARK_MODE_KEY, newMode.toString());
  }, []);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(prev => !prev);
  };
  
  return (
    // Bọc bằng SUSPENSE
    <Suspense fallback={
        <div style={{ padding: 50, textAlign: 'center', fontSize: '20px' }}>
          Đang tải... (Loading...)
        </div>
      }>
      {/* 👈 ÁP DỤNG CLASS CSS TÙY THEO TRẠNG THÁI */}
      <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}> 
        <AppHeader 
          toggleSideMenu={toggleSideMenu} 
          isDarkMode={isDarkMode} // 👈 Truyền trạng thái
          onToggleDarkMode={handleToggleDarkMode} // 👈 Truyền hàm xử lý
        />
        
        <div className="SideMenuAndPageContent">
          <SideMenu 
            isSideMenuOpen={isSideMenuOpen} 
            toggleSideMenu={toggleSideMenu} 
          />
          <PageContent></PageContent>
        </div>
        
        <AppFooter />

        {isSideMenuOpen && (
          <div 
            className="menu-overlay" 
            onClick={toggleSideMenu} 
          />
        )}
      </div>
    </Suspense> 
  );
}
export default App;