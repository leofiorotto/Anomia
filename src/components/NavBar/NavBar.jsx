import classes from "./NavBar.css";
import "./NavBar.css";
import logo from "../../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <img
        src={logo}
        className="logo"
        alt="logo"
        onClick={() => navigate("/")}
      />
    </nav>
  );
};

export default NavBar;
