import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import BoardUser from "./components/BoardUser";
import BoardCompany from "./components/BoardCompany";
import BoardAdmin from "./components/BoardAdmin";
import PostingList from "./components/PostingList";
import AddPosting from "./components/AddPosting";
import Posting from "./components/Posting";
import Footer from "./components/Footer/Footer";
import Apply from "./components/Apply/Apply";
import UserUpdate from "./components/UserUpdate";
import ApplicantList from "./components/ApplicantList";

import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editProfile/:id" element={<EditProfile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/company" element={<BoardCompany />} />
          <Route path="/applicantList" element={<ApplicantList />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/admin/user/:id" element={<UserUpdate />} />
          <Route path="/postings" element={<PostingList />} />
          <Route path="/add" element={<AddPosting />} />
          <Route path="/postings/:id" element={<Posting />} />
          <Route path="/apply/:id" element={<Apply />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
