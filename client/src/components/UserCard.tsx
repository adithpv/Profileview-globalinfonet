import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

import { Profile } from "../types/types";
import { ProfileContext } from "../context/userProfileContext";
import imageUrl from "../assets/potrait2.jpg";
import style from "../styles/userCard.module.css";

const UserCard = () => {
  const { search = [], userData = [] } = useContext(ProfileContext) || {};
  let data: any = search.length !== 0 ? search : userData;
  const profImg = {
    backgroundImage: `url(${imageUrl})`,
  };

  const Cards = data?.map((user: Profile) => {
    return (
      <React.Fragment key={user.Id}>
        <Link to={`/user/${user.Id}`}>
          <article className={style["article__card"]}>
            <div className={style["article__card--wrapper"]} style={profImg}>
              <div className={style["article__card--nav"]}>
                <AiOutlinePlus className={style["article__card-addBtn"]} />
                <p>{user.name}</p>
                <AiOutlineHeart className={style["article__card-likeBtn"]} />
              </div>
              <div className={style["article__card--summary"]}>
                <div className={style["article__card--numbers"]}>
                  <p>Job</p>
                  <span>{user.position}</span>
                </div>
                <div className={style["article__card--numbers"]}>
                  <p>Role</p>
                  <span>{user.role}</span>
                </div>
                <div className={style["article__card--numbers"]}>
                  <p>Experience</p>
                  <span>{user.experience} years</span>
                </div>
              </div>
            </div>

            <div className={style["article__card--profile"]}>
              <h2 className={style["article__card--username"]}>{}</h2>
              <p className={style["article__card--about"]}>
                {user.description}
              </p>
              <Link to={`/user/${user.Id}`}>
                <button className={style["article__card--btn"]}>
                  More Details
                </button>
              </Link>
            </div>
          </article>
        </Link>
      </React.Fragment>
    );
  });

  return <div className={style["hero__userCard--container"]}>{Cards}</div>;
};

export default UserCard;
