import { NavLink } from "react-router-dom";
import classes from "./NavBar.module.scss";

export const HeaderNavigate = ({ path, onClick, title }) => {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive, isPending }) => 
        isPending ? "pending" : isActive ? classes.NavActive : ""}
    >
      {title}
    </NavLink>
  );
};
