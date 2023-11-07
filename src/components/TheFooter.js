import React from "react";
import "./Footer.css";

const Footer = () => {
  const nowDate = new Date();

  const date = `${nowDate.getFullYear()}년 ${
    nowDate.getMonth() + 1
  }월 ${nowDate.getDate()}일`;

  return (
    <footer>
      <div className="footer-box">
        <a
          href="https://github.com/kkyuheak/Razer-movie"
          target="_blank"
          rel="noreferrer"
        >
          Github Repository
        </a>
        <p>{date}</p>
      </div>
    </footer>
  );
};

export default Footer;
