import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

const questions = [
  {
    question: "What type of landscape do you prefer for your trip?",
    choices: ["Mountains", "Beach", "Desert", "Forest", "Cityscape"]
  },
  {
    question: "What climate do you enjoy the most while traveling?",
    choices: ["Mild and temperate", "Warm and tropical", "Cool and snowy", "Hot and dry"]
  },
  {
    question: "What activities excite you the most during a vacation?",
    choices: ["Hiking and outdoor adventures", "Exploring cultural landmarks and museums", "Water sports and beach activities", "Shopping and urban experiences", "Tasting local food and culinary tours"]
  },
  {question: "What’s your ideal duration for a trip?",
    choices: ["A weekend getaway", "A short vacation (3–7 days)", "A longer trip (1–2 weeks)", "An extended stay (over 2 weeks)"]},
  {
    question: "What is your estimated daily budget for this trip?",
    choices: ["Less than €50", "Between €50 and €100", "Between €100 and €200", "Over €200"]
  },
  {
    question: "What kind of traveler are you?",
    choices: ["Solo traveler", "Family traveler", "A group traveler with friends", "A couple seeking romantic destinations"]
  },
  {
    question: "Which of these is most important for your trip?",
    choices: ["Relaxation and leisure", "Adventure and adrenaline", "Cultural discovery and learning", "Socializing and meeting new people"]
  }
];

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [recommendations, setRecommendations] = useState([]); // To store backend suggestions
  const [loading, setLoading] = useState(false); // To show a loading indicator

  const handleChoice = (choice) => {
    setSelectedAnswer(choice);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      setAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
      setSelectedAnswer(null); // Reset selected answer
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        sendAnswersToBackend();
      }
    } else {
      alert("Please select an answer.");
    }
  };
  const sendAnswersToBackend = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      });
      const data = await response.json();
      if (response.ok) {
        setRecommendations(data);
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error sending answers:", error);
      alert("An error occurred. Please try again.");
    }
  };

  
  return (
    <div className="questionnaire-page">
      {/* Navbar with logo and links */}
      <header className="header">
        <Link to="/">
          <img src={require("./asserts/Logo.PNG")} alt="Logo" className="logo" />
        </Link>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>
      </header>

      <div className="questionnaire-container">
        {/* Left side: Questions */}
        {recommendations.length === 0 ? (
          <div className="question-box">
            <h2 className="question">{questions[currentQuestion].question}</h2>
            <div className="choices">
              {questions[currentQuestion].choices.map((choice, index) => (
                <label key={index} className="choice-label">
                  <input
                    type="radio"
                    name="choice"
                    value={choice}
                    checked={selectedAnswer === choice}
                    onChange={() => handleChoice(choice)}
                    className="choice-input"
                  />
                  {choice}
                </label>
              ))}
            </div>
            {currentQuestion < questions.length - 1 ? (
              <button className="next-button" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button
                onClick={sendAnswersToBackend}
                className="cta-button"
              >
                {loading ? "Loading..." : "See Suggestions"}
              </button>
            )}
          </div>
        ) : (
          <div className="results-container">
            <h2>Top Travel Recommendations</h2>
            <ul className="recommendations-list">
              {recommendations.map((rec, index) => (
                <li key={index}>
                  <strong>{rec.name}:</strong> {rec.description}
                </li>
              ))}
            </ul>
            
          </div>
        )}

        {/* Right side: Image */}
        <div className="image-container">
          <img src={require("./asserts/your-image.jpg")} alt="Destination" className="question-image" />
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;