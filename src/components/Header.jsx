import { useState } from "react";
import "./Header.css";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div>
      <header>
        <div className="brand">
          <a href="/">UPI Crypto</a>
        </div>
        <div className="auth">{isLoggedIn ? <a>Logout</a> : <a>Login</a>}</div>
      </header>
    </div>
  );
}
