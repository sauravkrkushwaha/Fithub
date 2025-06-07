import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import LandingPage from "./LandingPage";
import CoachCategory from "./CoachCategory";
import CoachList from "./CoachList";
import CoachProfile from "./CoachProfile";
import Signup from "./Signup";
import Login from "./Login";
import ChatList from "./ChatList";
import Chat from "./Chat";
import CoachForm from "./CoachForm";
import SignupChoice from "./SignupChoice";
import BodyExercise from "./BodyExercise";
import UserProfile from "./UserProfile";

function Index() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/coach-category" element={<CoachCategory />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/coach-list" element={<CoachList />} />
        <Route path="/coach-profile/:id" element={<CoachProfile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat-list" element={<ChatList />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/coach-form" element={<CoachForm />} />
        <Route path="/signup-choice" element={<SignupChoice />} />
        <Route path="/body-exercise/:bodyPart" element={<BodyExercise />} />
        <Route path="/coach-edit/:id" element={<CoachForm />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default Index;