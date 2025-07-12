import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar or Navbar here */}
      <div className="flex-1 ml-0">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
