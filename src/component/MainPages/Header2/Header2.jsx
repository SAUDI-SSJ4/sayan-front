import { useAuth } from "../../../utils/hooks/useAuth";
import NavBar from "../Header/NavBar";
import classes from "./AcademyHeaderContainer.module.scss";
// import NavBar from "./NavBar";

const Header2 = ({ children, path, LayOut2, layOut3 }) => {
  const { user } = useAuth();


  return (
    <div className={classes.Container}>
    <NavBar user={user ?? null} />
    {children}
  </div>
  );
};

export default Header2;
