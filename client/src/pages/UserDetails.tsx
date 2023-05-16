import React, { useEffect, useState } from "react";

import axios from "axios";
import Modal from "react-modal";
import { useParams, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

import { Profile } from "../types/types";
import profImg from "../assets/potrait2.jpg";
import AddUserUpdate from "../components/AddUserUpdate";
import { loadingSpinnerCss } from "../utility/customCss";
import style from "../styles/userDetails.module.css";

const UserDetails = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState<Profile>();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getSingleUsers();
  }, [id]);

  const getSingleUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${id}`);
      setUserDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id: any) => {
    try {
      let res = await axios.delete(`http://localhost:3001/users/${+id}`);
      console.log("deleted successfully");
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleDeleteModalOpen = () => {
    setDeleteModalIsOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalIsOpen(false);
  };

  const handleDeleteConfirm = () => {
    handleDeleteModalClose();
    deleteUser(id);
    navigate("/");
  };

  if (isEditing) {
    return <AddUserUpdate onCancelClick={handleCancelClick} />;
  }

  if (loading) {
    return <HashLoader style={loadingSpinnerCss} color="#1d90f5" />;
  }

  return (
    <article className={style["userDetails__container"]}>
      <section className={style["userDetails__section-1"]}>
        <div className={style["section-1__profile"]}>
          <img
            src={
              userDetails?.imgUrl
                ? `https://2mxff3.sharepoint.com${userDetails?.imgUrl}`
                : profImg
            }
            alt=""
            width="80px"
            height="80px"
            className={style.profileImg}
          />
          <div className={style["profile-summary"]}>
            <h3>{userDetails?.name}</h3>
            <p>{userDetails?.position}</p>
          </div>
        </div>

        <div className={style["section-1__buttons"]}>
          <button className={style["edit-btn"]} onClick={handleEditClick}>
            Edit
          </button>
          <button
            className={style["delete-btn"]}
            onClick={handleDeleteModalOpen}
          >
            Delete
          </button>
          <Modal
            isOpen={deleteModalIsOpen}
            onRequestClose={handleDeleteModalClose}
            className={style.deleteModal}
            overlayClassName={style.deleteOverlay}
          >
            <h2>Confirm delete?</h2>
            <div className={style.modalButtons}>
              <button
                className={style.cancelButton}
                onClick={handleDeleteModalClose}
              >
                Cancel
              </button>
              <button
                className={style.confirmButton}
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </Modal>
        </div>
      </section>
      <section className={style["userDetails__section-2"]}>
        <div className={style.description}>
          <h3>Description</h3>
          <p>{userDetails?.description}</p>
        </div>
      </section>

      <section className={style["userDetails__section-3"]}>
        <p>
          <strong>Gender :</strong> {userDetails?.gender}
        </p>
        <p>
          <strong>Role :</strong> {userDetails?.role}
        </p>
      </section>

      <section className={style["userDetails__section-4"]}>
        <div className={style["grid-cell1"]}>
          <div className={style.city}>
            <h4>City</h4>
            <p>{userDetails?.city}</p>
          </div>
          <div className={style.country}>
            <h4>Phone num</h4>
            <p>{userDetails?.phonenum}</p>
          </div>
          <div className={style.date}>
            <h4>Start Date</h4>
            <p>{userDetails?.joindate}</p>
          </div>
        </div>
        <div className={style["grid-cell2"]}>
          <div className={style.experience}>
            <h4>Experience</h4>
            <p>{userDetails?.experience}</p>
          </div>
          <div className={style.department}>
            <h4>Email</h4>
            <p>{userDetails?.email}</p>
          </div>
          <div className={style.dateofbirth}>
            <h4>Date of birth</h4>
            <p>{userDetails?.date && userDetails.date.slice(0, 10)}</p>
          </div>
        </div>
      </section>
    </article>
  );
};

export default UserDetails;
