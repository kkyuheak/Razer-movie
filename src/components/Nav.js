import React, { useState } from "react";
import "./Nav.css";

const Nav = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
    console.log(open);
  };

  return (
    <>
      <header>
        <div className="nav">
          <div className="nav-left">
            <div className="menu-icon" onClick={handleClick}>
              <img src="images/menu.png" alt="menu-icon" />
            </div>
            <div className="logo-title">
              <p>R A Z E R</p>
            </div>
          </div>
          <div className="nav-right">
            <button className="login-btn">로그인</button>
            <button className="signIn-btn">회원가입</button>
          </div>
        </div>
        <div className={open ? "side-menu show" : "side-menu"}>
          <div className="close-icon" onClick={handleClick}>
            <img src="images/close.png" alt="close-icon" />
          </div>

          <p>홈</p>
          <p>TV프로그램</p>
        </div>
      </header>
    </>
  );
};

export default Nav;
