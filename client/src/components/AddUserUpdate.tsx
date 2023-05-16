import React, { useState, useEffect, useContext, useCallback } from "react";

import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { BiImageAdd } from "react-icons/bi";

import { Profile } from "../types/types";
import profImg from "../assets/potrait2.jpg";
import { loadingSpinnerCss } from "../utility/customCss";
import style from "../styles/addUserUpdate.module.css";

type AddUserUpdateProps = {
  onCancelClick: () => void;
};

const AddUserUpdate: React.FC<AddUserUpdateProps> = ({ onCancelClick }) => {
  const [currentUser, setCurrentUser] = useState<Profile>({
    name: "",
    date: "",
    description: "",
    email: "",
    city: "",
    joindate: "",
    phonenum: "",
    position: "",
    role: "",
    gender: "",
    experience: "",
    imgUrl: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const imageData = currentUser?.imgUrl
    ? `https://2mxff3.sharepoint.com/${currentUser?.imgUrl}`
    : profImg;

  useEffect(() => {
    getSingleUser();
  }, [id]);

  const getSingleUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/users/${id}`);
      const data = response.data;
      setCurrentUser(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  const handleChange = useCallback(
    (e: { target: { name: any; value: any } }) => {
      const { name: key, value } = e.target;
      setCurrentUser((prevState) => ({ ...prevState, [key]: value }));
    },
    []
  );

  const handleImageUpload = (e: any) => {
    setSelectedImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      const response = await axios.post(
        `http://localhost:3001/doc/image/upload/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      getSingleUser();
      const imageUrl = response.data.imageUrl;
      setCurrentUser((prevState) => ({ ...prevState, imgUrl: imageUrl }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `http://localhost:3001/users/update/${id}`,
        { user: currentUser }
      );
      getSingleUser();
      navigate(`/users/${id}`);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <section className="container">
      <div className={style["addUpdate__wrapper"]}>
        {currentUser && (
          <form className={style["addUpdate__form"]} onSubmit={handleSave}>
            {isLoading && (
              <div className={style.loader}>
                <HashLoader style={loadingSpinnerCss} color="#1d90f5" />
              </div>
            )}
            <div className={style["addUpdate__personal"]}>
              <div className={style["addUpdate__profile"]}>
                <img
                  src={imageData}
                  alt="Image of user"
                  width="90px"
                  height="80px"
                />
                <label htmlFor="imgUpload">
                  <div className={style["profileImage__add"]}>
                    <BiImageAdd />
                    <input
                      type="file"
                      id="imgUpload"
                      onChange={handleImageUpload}
                    />
                    <p className={style.tooltip}>Click to add profile image</p>
                  </div>
                  <button type="submit" onClick={uploadImage}>
                    Submit
                  </button>
                </label>
              </div>
              <label htmlFor="forName" className={style["addUpdate__name"]}>
                Name
                <input
                  type="text"
                  id="forName"
                  name="name"
                  placeholder="Name"
                  value={currentUser?.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label htmlFor="dateOfbirth" className={style["addUpdate__dob"]}>
                Date of birth
                <input
                  type="date"
                  name="date"
                  placeholder="Enter your date of birth"
                  value={currentUser?.date && currentUser.date.slice(0, 10)}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className={style["addUserUpdate__radio"]}>
                <p>Gender</p>
                <label htmlFor="male" className={style["addUpdate__male"]}>
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    checked={currentUser?.gender === "male"}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label htmlFor="female" className={style["addUpdate__female"]}>
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    checked={currentUser?.gender === "female"}
                    onChange={handleChange}
                  />
                  Female
                </label>
                <label htmlFor="other" className={style["addUpdate__other"]}>
                  <input
                    type="radio"
                    name="gender"
                    id="other"
                    value="other"
                    checked={currentUser?.gender === "other"}
                    onChange={handleChange}
                  />
                  Other
                </label>
              </div>

              <label htmlFor="city" className={style["addUpdate__city"]}>
                City
                <select name="city" id="city" value={currentUser?.city || ""}>
                  <option value="">Chose an option</option>
                  <option value="trivandram">Trivandram</option>
                  <option value="thrissur">Thrissur</option>
                  <option value="kozhikode">Kozhikode</option>
                  <option value="ernamkulam">Ernamkulam</option>
                </select>
              </label>

              <label
                htmlFor="position"
                className={style["addUpdate__position"]}
              >
                Position
                <input
                  type="text"
                  id="position"
                  name="position"
                  placeholder="Position"
                  value={currentUser?.position}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className={style["addUpdate__employment"]}>
              <label htmlFor="role" className={style["addUpdate__role"]}>
                Role
                <input
                  type="text"
                  id="role"
                  name="role"
                  placeholder="Role"
                  value={currentUser?.role}
                  onChange={handleChange}
                  required
                />
              </label>

              <label
                htmlFor="phoneNum"
                className={style["addUpdate__phoneNum"]}
              >
                Phone Number
                <input
                  id="Phone Number"
                  type="number"
                  name="phonenum"
                  placeholder="Enter your phone number"
                  value={currentUser?.phonenum}
                  onChange={handleChange}
                  required
                />
              </label>

              <label htmlFor="email" className={style["addUpdate__email"]}>
                Email
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@mail.com"
                  value={currentUser?.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label
                htmlFor="startDate"
                className={style["addUpdate__startdate"]}
              >
                Start Date
                <input
                  id="startDate"
                  type="date"
                  name="joindate"
                  value={
                    currentUser?.joindate && currentUser.joindate.slice(0, 10)
                  }
                  onChange={handleChange}
                />
              </label>

              <label
                htmlFor="experience"
                className={style["addUpdate__experience"]}
              >
                Experience
                <input
                  id="experience"
                  type="range"
                  name="experience"
                  min="0"
                  max="20"
                  value={currentUser?.experience || 0}
                  onChange={handleChange}
                />
                <p>{currentUser?.experience} yr</p>
              </label>

              <label
                htmlFor="description"
                className={style["addUpdate__description"]}
              >
                Description
                <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Short description about yourself"
                  value={currentUser?.description}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className={style["addUpdate__buttons"]}>
              <button
                className={style["addUpdate__cancel"]}
                onClick={onCancelClick}
              >
                Cancel
              </button>
              <button type="submit" className={style["addUpdate__save"]}>
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default AddUserUpdate;
