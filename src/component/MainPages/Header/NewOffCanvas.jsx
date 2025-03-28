import React from "react";
import { useLocation } from "react-router-dom";
import classes from "./NavBar.module.scss";

const NewOffCanvas = ({ show, onClose, logo, links, renderUserButtons, renderUserButtonsMobile }) => {
  const location = useLocation();

  // Check for screen width to decide whether to use mobile or desktop layout
  const isMobile = window.innerWidth <= 991;  // You can adjust this breakpoint as needed

  return (
    <>
      {show && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
          style={{ zIndex: 9998 }}
        />
      )}
      <div
        id="drawer-right-example"
        className={`fixed top-0 right-0 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 ${
          show ? "translate-x-0" : "translate-x-full "
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
        style={{ zIndex: 9999 }}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center mb-4">
          <h5
            id="drawer-right-label"
            className="inline-flex items-center text-base font-semibold text-gray-500 "
          >
            <div className="logo px-5">
              <img src={logo} alt="sayn academy logo" />
            </div>
          </h5>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center "
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        {/* Drawer Body */}
        <ul className="space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={link.path}
                className={`block py-2 ps-3 hover:bg-gray-100  ${
                  location.pathname === link.path
                    ? classes.NavActive + " bg-zinc-100 rounded-md"
                    : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  link.onClick(e, link.path);
                }}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>

        {/* User Buttons */}
        <div className="flex mt-10 gap-4 px-4">
          {isMobile ? renderUserButtonsMobile() : renderUserButtons()}
        </div>
      </div>
    </>
  );
};

export default NewOffCanvas;
