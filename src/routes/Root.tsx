import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const root = () => {
  return (
    <>
      <header>
        <nav>
          <h2>Kitchen Sink</h2>
          <ul>
            <li>
              <NavLink to="/">Countries</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <span>© Kiran {new Date().getFullYear()}</span>
      </footer>
    </>
  );
};

export default root;
