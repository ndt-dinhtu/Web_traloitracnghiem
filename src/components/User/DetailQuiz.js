import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../service/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import Rightcontent from "./RightContent/Rightcontent";

const DetailQuiz = () => {
  const location = useLocation();
  const params = useParams();
  const quizId = params.id;
  const [showModalResult, setShowModalResult] = useState(false);
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [dataModalResult, setDataModalResult] = useState({});
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
  const handleCheckBox = (answersId, questionId) => {
    const dataQuizClone = _.cloneDeep(dataQuiz);

    const indexQuestion = dataQuizClone.findIndex(
      (i) => +i.questionId === +questionId,
    );

    if (indexQuestion !== -1) {
      const question = dataQuizClone[indexQuestion];

      question.answers = question.answers.map((ans) => {
        if (+ans.id === +answersId) {
          return { ...ans, isSelected: !ans.isSelected };
        }
        return ans;
      });

      setDataQuiz(dataQuizClone);
    }
  };

  const handleFinish = async () => {
    const payload = {
      quizId: +quizId,
      answers: [],
    };

    if (dataQuiz && dataQuiz.length > 0) {
      payload.answers = dataQuiz.map((question) => {
        let arrAnswerId = [];

        question.answers.forEach((question) => {
          if (question.isSelected) {
            arrAnswerId.push(question.id);
          }
        });

        return {
          questionId: +question.questionId,
          userAnswerId: arrAnswerId,
        };
      });
    }

    let res = await postSubmitQuiz(payload);

    if (res && res.EC === 0) {
      setDataModalResult({
        countCorrect: res.DT.countCorrect,
        countTotal: res.DT.countTotal,
        quizData: res.DT.quizData,
      });
      setShowModalResult(true);
    } else {
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
          <button className="btn btn-warning " onClick={() => handleFinish()}>
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">
        <Rightcontent
          dataQuiz={dataQuiz}
          index={index}
          setIndex={setIndex} 
          handleFinish={handleFinish}
        />
      </div>
      <ModalResult
        show={showModalResult}
        setShow={setShowModalResult}
        dataModalResult={dataModalResult}
        setDataModalResult={setDataModalResult}
      />
    </div>
  );
};

export default DetailQuiz;
