import React, { useEffect, useRef, useState } from "react";
import "./typing-input.scss";

export default function TypingInput({
  textToType,
  updateCurrentWord,
  updateCurrentCharacter,
  incrementWordIndex,
  setMessages,
}) {
  const inputRef = useRef();
  const [startTime, setStartTime] = useState(null);
  const [inputText, setInputText] = useState("");
  const [textChunks, setTextChunks] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setTextChunks(textToType.split(" "));
    startTypingTest();
  }, [textToType]);

  function handleChange(e) {
    if (!startTime) setStartTime(new Date().getTime());
    const validatedWord_bounds = e.target.value.substring(0, 25).trim();
    setInputText(validatedWord_bounds);
    updateCurrentWord(validatedWord_bounds);
    if (
      wordIndex === textChunks.length - 1 &&
      e.target.value.trim() == textChunks[wordIndex]
    ) {
      return handleFinished();
    }
  }

  function onKeyDown(e) {
    let { code } = e;
    if (code === "Space") {
      if (textChunks[wordIndex] == inputText) {
        setInputText("");
        if (wordIndex < textChunks.length - 1) {
          setWordIndex(wordIndex + 1);
          incrementWordIndex();
        }
      }
    }
  }

  function handleFinished() {
    const totalWords = textToType.length / 5;
    const timeTaken = (new Date().getTime() - startTime) / 1000;
    const typingSpeed = totalWords / timeTaken;

    setMessages([
      `Typed ${totalWords} words (${textToType.length} characters)`,
      `Time taken: ${timeTaken} seconds`,
      `Typing speed (Words per second): ${parseFloat(typingSpeed).toFixed(2)}`,
      `Typing speed (Words per minute): ${Math.round(typingSpeed * 60)}`,
      `Typing speed (Characters per minute): ${Math.round(
        (textToType.length / timeTaken) * 60
      )}`,
      `Typing speed (Characters per second): ${Math.round(
        textToType.length / timeTaken
      )} `,
    ]);

    endTypingTest();

    setStartTime(null);
  }

  function startTypingTest() {
    inputRef.current.classList.remove("disabled");
    inputRef.current.focus();   
    setStartTime(null);
    setInputText("");
    setWordIndex(0);
  }
  /** Add startTypingTest() when the user presses - New test */
  function endTypingTest() {
    inputRef.current.classList.add("disabled");
    inputRef.current.blur();
  }

  return (
    <>
      <input
        className="input"
        ref={inputRef}
        placeholder="Type here..."
        onChange={handleChange}
        onKeyDown={onKeyDown}
        value={inputText}
      />
    </>
  );
}
