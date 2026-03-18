import React from "react";
import _ from "lodash";

const Question = ({ index, data,handleCheckBox }) => {
  if (_.isEmpty(data)) return <></>;

  const handleHandleCheckBox = (aId,qId) => {

    handleCheckBox(aId,qId)
  };
  return (
    <>
      <div className="q-image">
        {data.image ? (
          <img
            src={`data:image/jpeg;base64,${data.image}`}
            alt={`Question ${index + 1}`}
          />
        ) : (
          <div className="img-empty"></div>
        )}
      </div>

      <div className="question">
        Cau {index + 1}: {data.questionDescription}
      </div>

      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((ans, idx) => (
            <div className="form-check" key={`answer-${idx}`}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`check-${index}-${idx}`}
                checked={ans.isSelected}
                onChange={(e) => handleHandleCheckBox(ans.id,data.questionId)}
              />
              <label
                className="form-check-label"
                htmlFor={`check-${index}-${idx}`}
              >
                {ans.description}
              </label>
            </div>
          ))}
      </div>
    </>
  );
};

export default Question;
