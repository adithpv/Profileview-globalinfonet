import React, { useState, ChangeEvent, useContext } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { SlUserFollow } from "react-icons/sl";
import { ProfileContext } from "../context/userProfileContext";
import { HashLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import style from "../styles/addUser.module.css";

const initialState = {
  name: "",
  date: "",
  gender: "",
  email: "",
  description: "",
  joindate: "",
  city: "",
  phonenum: "",
  position: "",
  role: "",
  experience: "",
  imgUrl: "",
};

const AddUser = () => {
  const [form, setForm] = useState(initialState);
  const [sliderValue, setSliderValue] = useState(initialState.experience);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const context = useContext(ProfileContext);
  const { id } = useParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.name) {
      setIsSubmitting(true);

      const promise = axios.post("http://localhost:3001/users/adduser", form);

      const toastId: any = toast.promise(promise, {
        pending: "Adding user...",
        success: "User added successfully!",
        error: "Error adding user!",
      });

      try {
        const addUser = await axios.post(
          "http://localhost:3001/users/adduser",
          form
        );
        context?.userData.push(form);
        toast.update(toastId, {
          render: "User added successfully!",
          type: "success",
          autoClose: 8000,
        });
        setIsSubmitting(true);
        setTimeout(() => {
          navigate(`/user/${addUser.data.postData.data.Id}`);
        }, 500);
      } catch (error: AxiosError | any) {
        console.log(error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name } = e.target;
    const value = (e.target as HTMLInputElement | HTMLSelectElement).value;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
    <div className="container">
      <ToastContainer />

      <div className={style["addUser__wrapper"]}>
        <div className={style["addUser__form--left"]}>
          <div className={style["addUser__title"]}>
            <div className={style.logo}>
              <SlUserFollow />
              <h3>Add User Details</h3>
            </div>
            <p>Add details for user to profileview</p>
          </div>
        </div>
        <form
          action="#"
          className={style["addUser__form"]}
          onSubmit={handleSubmit}
        >
          <div className={style["addUser__form--personal-info"]}>
            <p>Personal Details</p>
            <label htmlFor="forName" className={style["addUser__name"]}>
              Name
              <input
                name="name"
                type="text"
                id="forName"
                placeholder="Enter your full name"
                onChange={handleChange}
              />
            </label>
            <label htmlFor="dateOfBirth" className={style["addUser__dob"]}>
              Date of birth
              <input
                type="date"
                id="dateOfBirth"
                name="date"
                placeholder="select date"
                onChange={handleChange}
              />
            </label>

            <div className={style["addUser__form--radio"]}>
              <label htmlFor="male">
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  onChange={handleChange}
                />
                Male
              </label>

              <label htmlFor="female">
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  onChange={handleChange}
                />
                Female
              </label>

              <label htmlFor="other">
                <input
                  type="radio"
                  name="gender"
                  id="other"
                  value="other"
                  onChange={handleChange}
                />
                Other
              </label>
            </div>
            {
              <label htmlFor="city" className={style["addUser__city"]}>
                City
                <select name="city" id="city" onChange={handleChange}>
                  <option value="">Chose an option</option>
                  <option value="trivandram">Trivandram</option>
                  <option value="thrissur">Thrissur</option>
                  <option value="kozhikode">Kozhikode</option>
                  <option value="ernamkulam">Ernamkulam</option>
                </select>
              </label>
            }
          </div>

          <div className={style["addUser__form--employee-details"]}>
            <p>Employement Details</p>
            <hr className={style["addUser__form-employee-details-hr"]} />
            <label
              htmlFor="position"
              className={style["addUser__form--position"]}
            >
              Position
              <input
                type="text"
                id="position"
                name="position"
                placeholder="Enter your Position"
                onChange={handleChange}
              />
            </label>
            <label htmlFor="role" className={style["addUser__form--role"]}>
              Role
              <input
                type="text"
                placeholder="Enter your Role"
                id="role"
                name="role"
                onChange={handleChange}
              />
            </label>
            <label
              htmlFor="phoneNum"
              className={style["addUser__form--phoneNum"]}
            >
              Phone
              <input
                type="text"
                id="phoneNum"
                name="phonenum"
                placeholder="Enter your phone number"
                onChange={handleChange}
              />
            </label>
            <label
              htmlFor="emailId"
              className={style["addUser__form--emailId"]}
            >
              Email
              <input
                type="email"
                id="emailId"
                name="email"
                placeholder="example@mail.com"
                onChange={handleChange}
              />
            </label>
            <label htmlFor="startDate" className={style["addUser__form--date"]}>
              Start Date
              <input
                type="date"
                id="startDate"
                name="joindate"
                placeholder="Select joining date"
                onChange={handleChange}
              />
            </label>
            <label htmlFor="experience">
              Experience
              <input
                type="range"
                name="experience"
                min="0"
                max="20"
                onChange={handleChange}
                // value={sliderValue}
              />
              <span id="experienceValue">0</span>
            </label>
            <label
              htmlFor="description"
              className={style["addUser__form--description"]}
            >
              Description
              <input
                type="text"
                id="description"
                name="description"
                placeholder="About yourself"
                onChange={handleChange}
              />
            </label>
            <div className={style["addUser__btn"]}>
              {isSubmitting ? (
                <HashLoader color="#1d90f5" size={50} />
              ) : (
                <>
                  <button className={style["addUser__submit"]}>Submit</button>
                  <button className={style["addUser__cancel"]}>Cancel</button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
