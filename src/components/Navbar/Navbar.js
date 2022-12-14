import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideNav from "react-simple-sidenav";
import "../../App.css";
import "./Navbar.css";
import { titleStyle, itemStyle } from "./sidebar-style";
import { useAuth, useCart, useWishlist } from "../../context";
import { userLogout } from "../../util/auth-methods";
import { useScreenContext } from "../../context/screen-context";


export const Navbar = () => {
  const { user, logout } = useScreenContext();
  const navigate = useNavigate();
  const [showSideNav, setShowSideNav] = useState(false);
  const { wishlistState } = useWishlist();
  const { cartState } = useCart();
  const { authState, authDispatch } = useAuth();
  

  const logoutHandler = () => {
    userLogout(authDispatch);
    logout();
    navigate("/login");
  };

  const routeData = [
    {
      path: "/",
      componentName: "Home",
    },
    {
      path: "/products",
      componentName: "Products",
    },
    {
      path: "/about-us",
      componentName: "About Us",
    },

    {
      path: "/wishlist",

      componentName: showSideNav ? (
        "Wishlist"
      ) : (
        <i className="far fa-bookmark icon-link-3pt">
          <span className="badge">{wishlistState.length}</span>
        </i>
      ),
    },
    {
      path: "/cart",

      componentName: showSideNav ? (
        "Cart"
      ) : (
        <i className="fas fa-shopping-cart icon-link-3pt">
          <span className="badge">{cartState.length}</span>
        </i>
      ),
    },
    {
      path: "/login",
      componentName: showSideNav ? (
        authState.isLoggedIn ? (
          <button className="login-btn" onClick={logoutHandler}>Logout</button>
        ) : ( <button className="login-btn">Login</button> )
        
      ) : authState.isLoggedIn ? (
        <>
          <span>Hello {authState.userData.firstName}</span>
          <button className="login-btn" onClick={logoutHandler}>Logout</button>
        </>
      ) : (
        <i className="fas fa-user icon-link-3pt"></i>
      ),
    },
    {
      path: "/",
      componentName: user.name,
    },
  ];
  return (
    <>
      <header className="header-3pt">
        <div className="header-logo-3pt">
          <img src="/img/logo.png" alt="" className="header-img-3pt" />
        </div>

        <div className="header-nav-3pt">
          <nav>
            <ul className="header-menu-3pt">
              {routeData.map((link, id) => {
                return (
                  <Link to={link.path} key={id}>
                    <li className="menu-item-3pt">{link.componentName}</li>
                  </Link>
                );
              })}
            </ul>
          </nav>
        </div>

        <input type="search" className="mbr-vw search" placeholder="Search.." />
        <i
          className="fas fa-bars hamburger-3pt"
          onClick={() => setShowSideNav(true)}
        ></i>

        <SideNav
          showNav={showSideNav}
          onHideNav={() => setShowSideNav(false)}
          title="Comic World"
          items={routeData.map((link) => {
            return (
              <Link to={link.path} onClick={() => setShowSideNav(false)}>
                {link.componentName}
              </Link>
            );
          })}
          titleStyle={titleStyle}
          itemStyle={itemStyle}
        />

        <div className="header-icons-3pt">
          <input type="search" className="search" placeholder="Search.." />
        </div>
      </header>
    </>
  );
};