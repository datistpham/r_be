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
  Report,
} from "@material-ui/icons";
import { NavLink as Link } from "react-router-dom";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LiquorIcon from '@mui/icons-material/Liquor';
import EqualizerIcon from '@mui/icons-material/Equalizer';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/staff/" className="link">
              {
                (({isActive}) => <li className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                  <LineStyle className="sidebarIcon" />
                    Home
                </li>)
              }
            
            </Link>
            <Link to="/staff/info" className="link">
              {
                (({isActive}) => <li className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                <LoyaltyIcon className="sidebarIcon" />
                Thông tin cá nhân
                </li>)
              }
            
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Hóa đơn</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <EqualizerIcon className="sidebarIcon" />
                Thanh toán
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
