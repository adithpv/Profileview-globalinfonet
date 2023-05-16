import React, { useState, useContext, ChangeEvent } from "react";

import { Link } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { SlUser } from "react-icons/sl";
import { AiOutlineSetting, AiOutlinePlus } from "react-icons/ai";

import { ProfileContext } from "../context/userProfileContext";
import style from "../styles/navbar.module.css";

const Navbar = () => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const context = useContext(ProfileContext);
  if (!context) return null;
  const { userData, setSearch } = context;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const text = e.target.value.toLowerCase();
    const searchItems = userData.filter((user) =>
      user.name.toLocaleLowerCase().includes(text)
    );
    setSearch(searchItems);
  };

  // const handleFormClose = () => {
  //   setShowForm(false);
  // };

  return (
    <nav className={style.nav}>
      <div className="container">
        <div className={style["nav__wraapper"]}>
          <Link to="/">
            <div className={`${style.logo} ${style.hover}`}>
              <SlUser />
              PROFILEVIEW
            </div>
          </Link>
          <div className={style.nav__menu}>
            <ul className={style["nav__menu--list"]}>
              <li className={style["nav__menu-item"]}>
                <Link to="/">Home</Link>
              </li>
              <li className={style["nav__menu-item"]}>
                <Link to="#">Insights</Link>
              </li>
              <li className={style["nav__menu-item"]}>
                <Link to="#">Messages</Link>
              </li>
              <li className={style["nav__menu-item"]}>
                <Link to="#">Scheduled</Link>
              </li>
            </ul>
          </div>
          <div className={style["nav__menu-icons"]}>
            <Link to="/addUser" className={style.add}>
              Add
            </Link>
            <AiOutlineSetting className={style.setting} />
            <BiSearch className={style.search} onClick={handleShowForm} />
          </div>
          {showForm && (
            <form className={style["nav__form"]}>
              <label htmlFor="searchUser" className={style["nav__form--label"]}>
                <input
                  type="text"
                  id="searchFor"
                  placeholder="Search Users"
                  onChange={handleChange}
                />
              </label>
            </form>
          )}
          <div className={style["nav__darkmode--toggle"]}>
            <BsSun />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
