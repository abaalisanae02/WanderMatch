import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import QuestionnairePage from "./Questionnaire";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />
      </Routes>
    </Router>
  );
};

export default App;
