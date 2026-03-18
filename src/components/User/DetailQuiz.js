import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz } from "../../service/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";

const DetailQuiz = () => {
  const location = useLocation();
  const params = useParams();
  const quizId = params.id;

  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  const fetchQuestion = async () => {
    const res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      const data = res.DT;

      const result = _.chain(data)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          let questionDescription = "";
          let image = null;

          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }

            if (item.answers) {
              item.answers.isSelected = false;
              answers.push(item.answers);
            }
          });

          return {
            questionId: +key,
            answers: _.orderBy(answers, ["id"], ["asc"]),
            questionDescription,
            image,
          };
        })
        .value();

      setDataQuiz(result);
      console.log("setDataQuiz: ", result);
    }
  };

  const handlePre = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleNext = () => {
    if (dataQuiz && index < dataQuiz.length - 1) {
      setIndex(index + 1);
    }
  };

  const handleCheckBox = (answerId, questionId) => {
    let dataQuizzClone = _.cloneDeep(dataQuiz);
    const question = dataQuizzClone.find(
      (item) => +item.questionId === +questionId,
    );
    console.log("question: ", question);
    const b = question.answers.map((i) => {
      if (+i.id === +answerId) i.isSelected = !i.isSelected;
      return i;
    });
    console.log("b: ", b);

    let indexQuestion = dataQuizzClone.findIndex(
      (item) => +item.questionId === +questionId,
    );
    if (indexQuestion !== -1) {
      dataQuizzClone[indexQuestion] = question;
      setDataQuiz(dataQuizzClone); 
    }
  };

  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz: {quizId}: {location?.state?.quizTitle}
        </div>
        <hr></hr>
        <div className="q-body"></div>
        <div className="q-content">
          <Question
            handleCheckBox={handleCheckBox}
            index={index}
            data={dataQuiz[index]}
          />
        </div>
        <div className="footer d-flex justify-content-center gap-3">
          <button
            className="btn btn-primary"
            disabled={index === 0}
            onClick={() => handlePre()}
          >
            Pre
          </button>
          <button
            className="btn btn-secondary"
            disabled={index === dataQuiz.length - 1}
            onClick={() => handleNext()}
          >
            Next
          </button>
          <button className="btn btn-warning">Finish</button>
        </div>
      </div>
      <div className="right-content">tight content</div>
    </div>
  );
};

export default DetailQuiz;
