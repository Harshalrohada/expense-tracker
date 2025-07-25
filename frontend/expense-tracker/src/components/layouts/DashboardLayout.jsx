import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Navbar activemenu={activeMenu} />

      {user && (
        <div className='flex'>
          {/* Sidebar */}
          <div className='max-[1080px]:hidden w-64'>
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Main content */}
          <div className='flex-1 mx-5'>{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
