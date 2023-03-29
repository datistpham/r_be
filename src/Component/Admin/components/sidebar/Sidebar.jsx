import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  PermIdentity,
  // eslint-disable-next-line
  BarChart,
  DynamicFeed,
  WorkOutline,
  // eslint-disable-next-line
} from "@material-ui/icons";
import { NavLink as Link } from "react-router-dom";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LiquorIcon from '@mui/icons-material/Liquor';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin/" className="link">
              {
                (({isActive}) => <li className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                  <LineStyle className="sidebarIcon" />
                    Home
                </li>)
              }
            
            </Link>
            <li className="sidebarListItem">
              <LoyaltyIcon className="sidebarIcon" />
                Khuyến mãi
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Thống kê doanh thu</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <EqualizerIcon className="sidebarIcon" />
                Doanh thu
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản lý người dùng</h3>
          <ul className="sidebarList">
            <Link to="/admin/users" className="link">
              {
                (({isActive}) => <li className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                  <PermIdentity className="sidebarIcon" />
                    Khách hàng
                </li>)
              }
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Thông báo</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
                Feedback
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản lý nhà hàng</h3>
          <ul className="sidebarList">
          <Link to="/admin/banquet-hall" className="link">
              {
                (({isActive}) => <li className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                <LiquorIcon className="sidebarIcon" />
                Sảnh tiệc
                </li>)
              }
            </Link>
            <Link to="/admin/dish" className="link">
              {
                (({isActive}) => <li className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                <FastfoodIcon className="sidebarIcon" />
                Món ăn
                </li>)
              }
            </Link>
            <Link to="/admin/menu" className="link">
              {
                (({isActive}) => <li className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                <RestaurantMenuIcon className="sidebarIcon" />
                Menu
                </li>)
              }
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản lý nhân viên</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
                Nhân viên
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
                Phân tích
            </li>
            {/* <li className="sidebarListItem">
              <Report className="sidebarIcon" />
                Báo cáo
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
