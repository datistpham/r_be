import "./sidebar.css";
import {
  LineStyle,
} from "@material-ui/icons";
import { NavLink as Link } from "react-router-dom";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import Navigation from "../../../Navigation/Navigation";

export default function Sidebar() {
  return (
    <div className="aaa">
      <div className="" style={{display: "flex", justifyContent: "center", alignItem: 'center', gap: 10}}>
          <ul className="ulll" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Link to="/staff/" className="link">
              {
                (({isActive}) => <li style={{fontSize: 20}} className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                  <LineStyle style={{width: 20}}  className="sidebarIcon" />
                    Home
                </li>)
              }
            
            </Link>
            
          </ul>
          <ul className="ulll" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Link to="/staff/info" className="link">
              {
                (({isActive}) => <li style={{fontSize: 20}} className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                <LoyaltyIcon style={{width: 20}} className="sidebarIcon" />
                Thông tin cá nhân
                </li>)
              }
            
            </Link>
          </ul>
          <ul className="ulll" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Link to="/staff/info" className="link">
              {
                (({isActive}) => <li style={{fontSize: 20}} className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                <EqualizerIcon style={{width: 20}}  className="sidebarIcon" />
                  Thanh toán
                </li>)
              }
            
            </Link>
          </ul>
          <Navigation />
      </div>
    </div>
  );
}
