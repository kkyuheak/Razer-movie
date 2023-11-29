import React, { useEffect } from "react";
import "./LoginPage.css";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import app from "../../firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (pathname === "/login") {
          navigate("/");
        }
      }
    });
  }, [auth, pathname, navigate]);

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        localStorage.setItem("userInfo", JSON.stringify(result.user));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="login-container">
      <LoginWrapper>
        <p>로그인</p>
        <Input type="text" placeholder="아이디를 입력하세요" />
        <p>비밀번호</p>
        <Input type="password" placeholder="비밀번호를 입력하세요" />
        <button type="submit" className="login-submit-btn">
          로그인
        </button>
        <button
          className="login-google-btn"
          onClick={(e) => {
            e.preventDefault();
            googleLogin();
          }}
        >
          <img src="/images/google-logo.png" alt="google-logo" />
          <p>구글로 로그인하기</p>
        </button>
      </LoginWrapper>
    </div>
  );
};

export default LoginPage;

const LoginWrapper = styled.form`
  max-width: 1000px;
  margin: auto;
`;

const Input = styled.input`
  width: 230px;
  height: 35px;
  padding: 0 5px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid rgba(19, 204, 6, 0.8);
  outline: none;

  &::placeholder {
    opacity: 0.4;
  }
`;
