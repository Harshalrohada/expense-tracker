import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../Cards/CharAvatar';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  };

  const handleClick = (route) => {
    if (route === 'logout' || route === '/logout') {
      handleLogout();
      return;
    }

    navigate(route);
  };

  

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-40">
      {/* User Name on Top */}
      <div className="mb-6">
        <h4 className="text-[16px] font-semibold text-gray-800 text-center">
          Welcome, {user?.fullName || ""} 👋
        </h4>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center justify-center gap-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full bg-slate-400 object-cover"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}
      </div>

      {/* Menu Items */}
      {SIDE_MENU_DATA.map((item, index) => (
  <button
    key={`menu_${index}`}
    className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 ${
      activeMenu === item.path ? 'bg-violet-600' : 'hover:bg-gray-100'
    }`}
    onClick={() => handleClick(item.path)}
  >
    <item.icon
      className={`text-2xl ${
        activeMenu === item.path ? 'text-white' : 'text-black'
      }`}
    />
    <span
      className={`${
        activeMenu === item.path ? 'text-white font-semibold' : 'text-black'
      }`}
    >
      {item.label}
    </span>
  </button>
))}
    </div>
  );
};

export default SideMenu;
