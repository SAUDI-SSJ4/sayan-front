
import classes from "./AcademyHeaderContainer.module.scss";
import NavBar from "./NavBar";
import { useAuth } from "../../../utils/hooks/useAuth";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const MainHeader = ({ children, path, LayOut2, layOut3 }) => {

  const {user, isLoading} = useAuth();


  return (
    <>
      <div className={`all-container-header ${classes.Container}`}>
        <NavBar path={path} user={user ?? null} />
        {children}
      </div>
    </>
  );
};

export default MainHeader;
