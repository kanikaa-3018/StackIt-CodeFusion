
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MobileNavigation from "@/components/MobileNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="flex min-h-[calc(100vh-4rem)]">
        {!isMobile && <Sidebar />}
        
        <main className="flex-1 w-full overflow-hidden">
          <div className="h-full p-3 sm:p-4 md:p-6 lg:p-8 pb-20 md:pb-8 max-w-full">
            {children}
          </div>
        </main>
        
        {isMobile && (
          <>
            <Sidebar 
              isOpen={sidebarOpen} 
              onClose={() => setSidebarOpen(false)}
              isMobile={true}
            />
            <MobileNavigation />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
