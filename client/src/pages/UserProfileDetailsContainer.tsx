import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link, useParams } from "react-router-dom";

import profImg from "../assets/defaultImg.jpg";
import UserDetails from "./UserDetails";
import Documents from "./Documents";
import style from "../styles/profileContainer.module.css";
import { Profile } from "../types/types";

const UserProfileDetailsContainer = () => {
  const [activeView, setActiveView] = useState("profile");
  const [profile, setProfile] = useState<Profile>();
  const { id } = useParams();

  const handleSwitchView = (view: string) => {
    setActiveView(view);
  };

  useEffect(() => {
    const getSingleUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${id}`);
        setProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleUsers();
  }, [id]);

  return (
    <section className={style["profile__container"]}>
      <div className="container">
        <nav className={style["profile__container--nav"]}>
          <div className={style["nav__profile-details"]}>
            <Link to="/">
              <button className={style["nav__back-btn"]}>Back</button>
            </Link>
            <img
              src={
                profile?.imgUrl
                  ? `https://2mxff3.sharepoint.com${profile?.imgUrl}`
                  : profImg
              }
              alt="profile picture of user"
              width="50px"
              height="50px"
            />
            <h3>{profile?.name}</h3>
          </div>

          <div className={style["nav__profile-buttons"]}>
            <button
              className={`${style["nav__profile-btn"]} ${
                activeView === "profile" ? style.active : ""
              }`}
              onClick={() => handleSwitchView("profile")}
            >
              Profile
            </button>
            <button
              className={`${style["nav__profile-doc"]} ${
                activeView === "documents" ? style.active : ""
              }`}
              onClick={() => handleSwitchView("documents")}
            >
              Documents
            </button>
          </div>
        </nav>

        <section className={style["profileView__section"]}>
          {activeView === "profile" && <UserDetails />}
          {activeView === "documents" && <Documents />}
        </section>
      </div>
    </section>
  );
};

export default UserProfileDetailsContainer;
