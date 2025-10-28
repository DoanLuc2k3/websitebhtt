import "./App.css";
import AppFooter from "./Components/AppFooter";
import AppHeader from "./Components/AppHeader";
import PageContent from "./Components/PageContent";
import SideMenu from "./Components/SideMenu";
import React, { useState, Suspense } from "react"; // 👈 Thêm Suspense
import "./i18n"; // 👈 IMPORT FILE I18N MỚI

function App() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(prev => !prev);
  };
  
  return (
    // 👈 BỌC BẰNG SUSPENSE
    <Suspense fallback={
        <div style={{ padding: 50, textAlign: 'center', fontSize: '20px' }}>
          Đang tải... (Loading...)
        </div>
      }>
      <div className="App">
        <AppHeader 
          toggleSideMenu={toggleSideMenu} 
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
    </Suspense> // 👈 END SUSPENSE
  );
}
export default App;