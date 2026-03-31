import React, { useEffect, useState, useRef } from "react";
import "./RightContent.scss";

const Rightcontent = ({ dataQuiz, index, setIndex, handleFinish }) => {
  const [count, setCount] = useState(599);
  const timerRef = useRef(null);
  const hasFinished = useRef(false);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);

          if (!hasFinished.current) {
            handleFinish();
            hasFinished.current = true;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [handleFinish]);

  const formatTime = (seconds) => {
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
  };

  const getClassQuestion = (question, idx) => {
    let className = "question";
    if (index === idx) className += " selected";

    const isAnswered = question.answers.some((a) => a.isSelected);
    if (isAnswered) className += " answered";

    return className;
  };

  return (
    <div className="right-content-container">
      <div className={`stats-time ${count < 30 ? "warning" : ""}`}>
        {formatTime(count)}
      </div>
      <hr />
      <div className="stats-questions">
        {dataQuiz?.map((item, idx) => (
          <div
            key={`question-key-${idx}`}
            className={getClassQuestion(item, idx)}
            onClick={() => setIndex(idx)}
          >
            {idx + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rightcontent;
