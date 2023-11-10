import React, { useState } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
    console.log(open);
  };

  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="nav">
          <div className="nav-left">
            <div className="menu-icon" onClick={handleClick}>
              <img src="images/menu.png" alt="menu-icon" />
            </div>
            <div
              className="logo-title"
              onClick={() => {
                navigate("/");
              }}
            >
              <p>R A Z E R</p>
            </div>
          </div>
          <div className="nav-right">
            <button
              className="login-btn"
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </button>
            <button className="signIn-btn">회원가입</button>
          </div>
        </div>
        <div className={open ? "side-menu show" : "side-menu"}>
          <div className="close-icon" onClick={handleClick}>
            <img src="images/close.png" alt="close-icon" />
          </div>

          <p
            onClick={() => {
              navigate("/");
            }}
          >
            홈
          </p>
          <p
            onClick={() => {
              navigate("/tvprogram");
            }}
          >
            TV프로그램
          </p>
        </div>
      </header>
    </>
  );
};

export default Nav;
