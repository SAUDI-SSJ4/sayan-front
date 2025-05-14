import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";

import Offcanvas from "react-bootstrap/Offcanvas";
import SideBar from "./sidebar";
import axiosInstance from "../../../axios";

function MobileSideBar({ show, setShow, profileData }) {
  return (
    <>
      <Offcanvas show={show} placement={"start"}>
        <Offcanvas.Body>
          <SideBar mobile setShow={setShow} profileData={profileData} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MobileSideBar;
