import { useState } from "react";
import "./Header.css";
// import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <header className="header">
      <div>
        <h4>Upi Crypto</h4>
      </div>
      {/* <div>{isLoggedIn ? <a>Logout</a> : <a>Login</a>}</div> */}
    </header>
  );
}
