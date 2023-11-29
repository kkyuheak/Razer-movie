import React, { useState } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [over, setOver] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const getUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log(getUserInfo);

  const handleClick = () => {
    setOpen(!open);
    console.log(open);
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("userInfo");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <header>
        <div className="nav">
          <div className="nav-left">
            <div className="menu-icon" onClick={handleClick}>
              <img src="../images/menu.png" alt="menu-icon" />
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
          {!getUserInfo ? (
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
          ) : (
            <div className="user-menu">
              <p
                className="user-name"
                onMouseOver={() => {
                  setOver(true);
                }}
                onMouseLeave={() => {
                  setOver(false);
                }}
              >
                {getUserInfo.displayName}
              </p>
              <div
                className={over ? "user-submenu open" : "user-submenu"}
                onMouseOver={() => {
                  setOver(true);
                }}
                onMouseLeave={() => {
                  setOver(false);
                }}
              >
                <p
                  className="logout-btn"
                  onClick={() => {
                    handleLogOut();
                  }}
                >
                  로그아웃
                </p>
              </div>
            </div>
          )}
        </div>
        <div className={open ? "side-menu show" : "side-menu"}>
          <div className="close-icon" onClick={handleClick}>
            <img src="../images/close.png" alt="close-icon" />
          </div>

          <p
            onClick={() => {
              navigate("/");
              setOpen(!open);
            }}
          >
            홈
          </p>
          <p
            onClick={() => {
              navigate("/tvprogram");
              setOpen(!open);
            }}
          >
            TV프로그램
          </p>
        </div>
        <div
          className={open ? "nav-black black-show" : "nav-black"}
          onClick={() => {
            setOpen(!open);
          }}
        ></div>
      </header>
    </>
  );
};

export default Nav;
