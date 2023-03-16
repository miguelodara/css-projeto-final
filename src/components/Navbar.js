import { useState } from "react";

import styles from "./Navbar.module.css";

import { NavLink, useLocation } from "react-router-dom";

import { useAuthentication } from "../hooks/useAuthentication";

import { useAuthValue } from "../context/AuthContext";
import { useEffect } from "react";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const [openMenu, setOpenMenu] = useState(false);

  const location = useLocation();

  const { pathname } = location;

  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        <span>Edit-On</span>
      </NavLink>
      <ul
        className={
          openMenu ? `${styles.nav_menu} ${styles.actived}` : styles.nav_menu
        }
      >
        <li className={styles.nav_item}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li className={styles.nav_item}>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Entrar
              </NavLink>
            </li>
            <li className={styles.nav_item}>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li className={styles.nav_item}>
              <NavLink
                to="/posts/create"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Novo post
              </NavLink>
            </li>
           
          </>
        )}
        <li className={styles.nav_item}>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
        <li className={styles.nav_item}>
          <NavLink
            to="/contato"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Contato
          </NavLink>
        </li>
        {user && (
          <li className={styles.nav_item}>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
      <div
        className={
          openMenu
            ? `${styles.hamburguer} ${styles.actived}`
            : styles.hamburguer
        }
        onClick={() => (!openMenu ? setOpenMenu(true) : setOpenMenu(false))}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
    </nav>
  );
};

export default Navbar;
