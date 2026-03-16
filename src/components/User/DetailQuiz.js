import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../service/apiService";

const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;

  useEffect(() => {
    fetchQuestion();
    console.log(params)
  }, [quizId]);

  const fetchQuestion = async () => {
    const data = await getDataQuiz(quizId);
    console.log(data);
  };
  return <div>DetailQuiz</div>;
};

export default DetailQuiz;
