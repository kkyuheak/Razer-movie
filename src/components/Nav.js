import React from "react";
import "./Nav.css";

const Nav = () => {
  return (
    <header>
      <div className="nav">
        <div className="nav-left">
          <div className="menu-icon">
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
    </header>
  );
};

export default Nav;
