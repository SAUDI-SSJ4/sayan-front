import { NavLink } from "react-router-dom";
import classes from "../../sidebar/sidebar.module.scss";

export const SubLinkOnMenu = ({ path, children }) => {
  return (
    <NavLink
      to={path}
      end
      className={({ isActive, isPending }) => {
        if (isPending) return "pending";
        if (isActive) return `${classes.activeSubLink}`;
        return `${classes.Link} text-decoration-none`;
      }}
    >
      {children}
    </NavLink>
  );
};
