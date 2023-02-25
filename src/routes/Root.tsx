import { Link, NavLink, Outlet } from "react-router-dom";

const root = () => {
  return (
    <>
      <header>
        <nav>
          <Link to="/">
            <h2>University finder</h2>
          </Link>
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
