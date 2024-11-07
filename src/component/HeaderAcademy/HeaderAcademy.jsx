import React from "react";

export default function HeaderAcademy({ title, icon, btn }) {
  return (
    <div>
      <div className="bg-white w-100 container-fluid  p-4 my-4 rounded-1 d-flex justify-content-between align-items-center">
        <div className=" d-flex justify-content-start align-items-center  gap-2">
          <div>{icon ? icon : ""}</div>
          <p className="fs-5">{title}</p>
        </div>

        {btn && <div> {btn}</div>}
      </div>
    </div>
  );
}
