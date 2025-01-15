import React from "react";
import "./Header.css";

const Header = () => {
  const username = "username";

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <h1>EuroLingo</h1>
        </div>
        <nav className="header-nav">
          <p>Hello {username}</p>
        </nav>
      </div>
    </header>
  );
};

export default Header;
