import React, { useContext, ChangeEvent, useEffect } from "react";

import { MdOutlineNumbers } from "react-icons/md";

import UserCard from "../components/UserCard";
import { ProfileContext } from "../context/userProfileContext";
import style from "../styles/home.module.css";

const Home = () => {
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



  return (
    <section className="container">
      <div className={style.hero}>
        <div className={style["hero__left"]}>
          <h1>Search for Users</h1>
          <form action="#" className={style["hero__left-form"]}>
            <label
              htmlFor="userSearch"
              className={style["hero__left-label"]}
            ></label>
            <input
              type="text"
              placeholder="Search for Users"
              className={style["hero__left-input"]}
              onChange={handleChange}
            />
          </form>
        </div>
        <div className={style["hero__right"]}>
          <div className={style["hero__right-card"]}>
            <div className={style["hero__right-card--container"]}>
              <MdOutlineNumbers className={style["hero__right-card--icon"]} />
              <span>{context?.userData?.length}</span>
            </div>
            <p className={style["hero__right-card--p"]}> Users</p>
          </div>
        </div>
      </div>

      <UserCard />
    </section>
  );
};

export default Home;
