import { NavLink } from "react-router-dom";
import classes from "../../sidebar/sidebar.module.scss";

export const SingleLinkOnMenu = ({ path, children }) => {
  return (
    <NavLink
      to={path}
      end
      className={({ isActive, isPending }) => {
        if (isPending) return "pending";
        if (isActive) return `${classes.activeLink} text-decoration-none`;
        return "text-decoration-none";
      }}
    >
      {children}
    </NavLink>
  );
};