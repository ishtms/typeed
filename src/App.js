import TypingInput from "./components/TypingInput";
import "./app.scss";
import { useState } from "react";

import quotes from "./utils/quotes.json";

function App() {
  const [textToType, setTextToType] = useState(getRandomQuote());
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [currentTypedWord, setCurrentTypedWord] = useState("");
  const [messages, setMessages] = useState([]);

  function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  function incrementWordIndex() {
    setCurrentWordIndex(currentWordIndex + 1);
  }

  function updateCurrentWord(typedWord) {
    setCurrentTypedWord(typedWord);
  }

  function refreshQuote() {
    setTextToType(getRandomQuote());
    setCurrentWordIndex(0);
    setCurrentTypedWord('')
    setMessages([])
  }

  function renderTextToType() {
    return textToType.split(" ").map((word, wordIndex) => {
      return (
        <span
          key={wordIndex}
          className={`word ${currentWordIndex === wordIndex && "active"}`}
        >
          {word.split("").map((letter, letterIndex) => {
            const isCorrect =
              wordIndex < currentWordIndex ||
              (currentWordIndex == wordIndex &&
                currentTypedWord[letterIndex] === letter &&
                letterIndex < currentTypedWord.length);

            const notTypedYet =
              wordIndex > currentWordIndex ||
              currentTypedWord.length <= letterIndex;
            return (
              <span
                key={letterIndex}
                className={`letter ${
                  isCorrect ? "correct" : notTypedYet ? "default" : "wrong"
                }`}
              >
                {letter}
              </span>
            );
          })}
          {currentWordIndex == wordIndex &&
            currentTypedWord.length > word.length && (
              <span className="letter overwrite">
                {currentTypedWord.substring(word.length)}
              </span>
            )}
        </span>
      );
    });
  }
  console.log(currentTypedWord);
  return (
    <div className="container">
      <h3 className="container__heading">Typeed</h3>
      <h4>Check your typing speed!</h4>
      <div className="container__progress-box">
        <p>{renderTextToType()}</p>
      </div>
      <div className="container__typing-area">
        <TypingInput
          updateCurrentWord={updateCurrentWord}
          incrementWordIndex={incrementWordIndex}
          textToType={textToType}
          setMessages={setMessages}
        />
        <span className="button" onClick={refreshQuote}>Next</span>
      </div>
      <div className="result">
        {messages.map((curr, index) => (
          <p key={index}>{curr}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
