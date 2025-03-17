"use client"
import { useState } from "react";
interface QuizQuestion {
  question: string;
  options: string[];
}
const quizData: QuizQuestion[] = [
  { question: "Cats or Dogs?", options: ["Cat", "Dog"] },
  { question: "Winter or Summer?", options: ["Winter", "Summer"] },
  { question: "Arms or Legs?", options: ["Arms", "Legs"] },
  { question: "Marine or Terrestrial?", options: ["Marine", "Terrestrial"] },
  { question: "Books or Films?", options: ["Books", "Films"] },
  { question: "Rat or Crab?", options: ["Rat", "Crab"] },
  { question: "Yoghurt or Cream?", options: ["Yoghurt", "Cream"] },
  { question: "Pancakes or Waffles?", options: ["Pancakes", "Waffles"] },
  { question: "Mug or Bowl?", options: ["Mug", "Bowl"] },
  { question: "Bog or Swamp?", options: ["Bog", "Swamp"] },
];
const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isNameEntered, setIsNameEntered] = useState(false);
  const handleNameSubmit = () => {
    if (name.trim() !== "") {
      setIsNameEntered(true);
      setCurrentQuestionIndex(0);
    }
  };
  const handleOptionSelect = async (option: string) => {
    const newResponses = [...userResponses, option];
    setUserResponses(newResponses);
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizFinished(true);
      await submitResponses(name, newResponses);
    }
  };
  const submitResponses = async (name: string, responses: string[]) => {
    try {
      console.log("Submitting responses:", { name, answers: responses });
      const response = await fetch("/api/tests/arianna", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, answers: responses }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        console.error("Server Response Error:", responseData);
        throw new Error("Failed to send responses to Airtable.");
      }
      console.log("Responses submitted successfully:", responseData);
    } catch (error) {
      console.error("Error submitting responses:", error);
    }
  };
  if (!isNameEntered) {
    return (
      <div style={containerStyle}>
        <h2>Enter Your Name</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", margin: "10px", width: "200px" }}
          placeholder="Your Name"
        />
        <button onClick={handleNameSubmit} style={buttonStyle}>
          Submit
        </button>
      </div>
    );
  }
  const currentQuestion = quizData[currentQuestionIndex];
  return (
    <div style={containerStyle}>
      <h2>Do you prefer...?</h2>
      {!isQuizFinished ? (
        <div>
          <h4>{currentQuestion.question}</h4>
          <div style={optionsContainerStyle}>
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionSelect(option)}
                style={{
                  ...optionStyle,
                  backgroundColor:
                    userResponses[currentQuestionIndex] === option ? "lightblue" : "white",
                }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3>Quiz Summary for {name}</h3>
          <p>{[name, ...userResponses].join(", ")}</p>
        </div>
      )}
    </div>
  );
};
// Styles
const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  width: "100%",
  minHeight: "100vh",
  backgroundColor: "#ED95B0",
  padding: "20px",
};
const optionsContainerStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
};
const optionStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  borderRadius: "5px",
  padding: "10px",
  margin: "10px",
  cursor: "pointer",
  minWidth: "100px",
  textAlign: "center",
};
const buttonStyle: React.CSSProperties = {
  padding: "10px 20px",
  margin: "10px",
  backgroundColor: "#9C284C",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
export default Quiz;