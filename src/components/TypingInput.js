import React, { useRef, useState } from "react";
import "./typing-input.scss";

export default function TypingInput({ textToType }) {
  const inputRef = useRef();
  const [startTime, setStartTime] = useState(null);
  const [messages, setMessages] = useState([])

  function handleChange(e) {
    if (!startTime) setStartTime(new Date().getTime());

    if (e.target.value === textToType) {
      handleFinished()
    }
  }

  function handleFinished() {
    const totalWords = textToType.length / 5;
    const timeTaken = (new Date().getTime() - startTime) / 1000
    const typingSpeed = (totalWords / (timeTaken))

    setMessages([
      `Typed ${totalWords} words (${textToType.length} characters)`,
      `Time taken: ${timeTaken} seconds`,
      `Typing speed (Words per second): ${parseFloat(totalWords/timeTaken).toFixed(2)}`,
      `Typing speed (Words per minute): ${Math.round((totalWords / timeTaken) * 60)}`,
      `Typing speed (Characters per minute): ${Math.round((textToType.length / timeTaken) * 60)}`,
      `Typing speed (Characters per second): ${Math.round(textToType.length / timeTaken)} `
    ])

    setStartTime(null)
  }

  return (
    <>
    <input
      className="input"
      ref={inputRef}
      placeholder="Type here..."
      onChange={handleChange}
    />
    <br />
    <br />
    <br />
    <br />

    {messages.map((curr, index) => <p key={index}>{curr}</p>)}
    </>
  );
}

