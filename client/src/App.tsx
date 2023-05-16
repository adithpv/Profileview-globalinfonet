import React from "react";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HorizontalRule from "./components/HorizontalRule";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import UserProfileDetailsContainer from "./pages/UserProfileDetailsContainer";

function App() {
  return (
    <>
      <Navbar />
      <HorizontalRule />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/user/:id" element={<UserProfileDetailsContainer />} />
      </Routes>
    </>
  );
}

export default App;
