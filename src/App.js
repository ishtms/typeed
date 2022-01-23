import TypingInput from "./components/TypingInput";
import "./app.scss";
import { useState } from "react";

import quotes from './utils/quotes.json';

function App() {

  const [textToType, setTextToType] = useState(quotes[Math.floor(Math.random() * quotes.length)])
  return (
    <div className="container">
      <h3 className="container__heading">Typeed - Check your typing speed</h3>
      <div className="container__progress-box">
        <p>{textToType}</p>
      </div>
      <div className="container__typing-area">
        <TypingInput textToType={textToType} />
      </div>
    </div>
  );
}

export default App;
