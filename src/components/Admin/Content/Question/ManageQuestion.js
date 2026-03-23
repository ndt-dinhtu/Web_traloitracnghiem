import React, { useEffect, useState } from "react";
import "./ManageQuestion.scss";
import { FcPlus } from "react-icons/fc";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { IoTrashOutline } from "react-icons/io5";
import {
  getAllQuizForAdmin,
  postCreateNewQuestion,
  postCreateNewAnswer,
} from "../../../../service/apiService";
import { toast } from "sonner";

const ManageQuestion = () => {
  const [dataQizz, setDataQuizz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: Date.now(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [{ id: Date.now() + 1, description: "", isCorrect: false }],
    },
  ]);

  const fetchQuestion = async () => {
    const res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setDataQuizz(res.DT);
    }
    console.log(res.DT);
  };
  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: Date.now(),
        description: "",
        imageFile: null,
        imageName: "",
        answers: [{ id: Date.now() + 1, description: "", isCorrect: false }],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      if (questions.length > 1) {
        setQuestions(questions.filter((q) => q.id !== id));
      }
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsCopy = JSON.parse(JSON.stringify(questions));
    let index = questionsCopy.findIndex((item) => item.id === questionId);

    if (index > -1) {
      if (type === "ADD") {
        const newAnswer = { id: Date.now(), description: "", isCorrect: false };
        questionsCopy[index].answers.push(newAnswer);
      }
      if (type === "REMOVE") {
        if (questionsCopy[index].answers.length > 1) {
          questionsCopy[index].answers = questionsCopy[index].answers.filter(
            (item) => item.id !== answerId,
          );
        }
      }
      setQuestions(questionsCopy);
    }
  };

  const handleInputChange = (type, questionId, value, answerId = null) => {
    let questionsCopy = [...questions];
    let index = questionsCopy.findIndex((item) => item.id === questionId);

    if (index > -1) {
      if (type === "QUESTION") {
        questionsCopy[index].description = value;
      } else if (type === "ANSWER") {
        let answerIndex = questionsCopy[index].answers.findIndex(
          (a) => a.id === answerId,
        );
        if (answerIndex > -1) {
          questionsCopy[index].answers[answerIndex].description = value;
        }
      } else if (type === "CHECKBOX") {
        let answerIndex = questionsCopy[index].answers.findIndex(
          (a) => a.id === answerId,
        );
        if (answerIndex > -1) {
          questionsCopy[index].answers[answerIndex].isCorrect = value;
        }
      }
      setQuestions(questionsCopy);
    }
  };

  const handleOnChangeFile = (e, id) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);

      let questionsCopy = [...questions];
      let index = questionsCopy.findIndex((item) => item.id === id);

      if (index > -1) {
        questionsCopy[index].imageFile = file;
        questionsCopy[index].imageName = file.name;
        questionsCopy[index].previewUrl = previewUrl;

        setQuestions(questionsCopy);
      }
    }
  };

  const handleSubmit = async () => {
    if (!selectedQuiz) {
      toast.error("Vui lòng chọn bài Quiz!");
      return;
    }

    let isValid = true;
    for (let [index, q] of questions.entries()) {
      if (!q.description) {
        toast.error(`Câu hỏi ${index + 1} đang trống nội dung!`);
        isValid = false;
        break;
      }

      const hasCorrect = q.answers.some((a) => a.isCorrect === true);
      if (!hasCorrect) {
        toast.error(`Câu hỏi ${index + 1} chưa có đáp án đúng!`);
        isValid = false;
        break;
      }

      for (let [aIdx, ans] of q.answers.entries()) {
        if (!ans.description) {
          toast.error(
            `Đáp án ${aIdx + 1} của Câu hỏi ${index + 1} đang trống!`,
          );
          isValid = false;
          break;
        }
      }
      if (!isValid) break;
    }

    if (!isValid) return;

    for (let question of questions) {
      const resQ = await postCreateNewQuestion(
        selectedQuiz,
        question.description,
        question.imageFile,
      );

      if (resQ && resQ.EC === 0) {
        const questionId = resQ.DT.id;

        await Promise.all(
          question.answers.map((answer) =>
            postCreateNewAnswer(
              answer.description,
              answer.isCorrect,
              questionId,
            ),
          ),
        );
      } else {
        toast.error(`Lỗi hệ thống khi tạo câu hỏi: ${question.description}`);
      }
    }

    toast.success("Đã lưu tất cả câu hỏi và câu trả lời thành công!");

    setQuestions([
      {
        id: Date.now(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [{ id: Date.now() + 1, description: "", isCorrect: false }],
      },
    ]);
  };
  return (
    <div className="questions-container container">
      <div className="title mb-3">Quản lý câu hỏi bài thi</div>

      <div className="d-flex col-md-6 mb-4">
        <label className=" p-2 form-label">Chọn bài Quiz:</label>
        <select
          className="form-select"
          value={selectedQuiz}
          onChange={(e) => setSelectedQuiz(e.target.value)}
        >
          <option value="">Chọn bài Quiz...</option>
          {dataQizz.map((quiz) => (
            <option key={quiz.id} value={quiz.id}>
              {quiz.id} - {quiz.description}
            </option>
          ))}
        </select>
      </div>

      <hr />
      {/* Danh sách câu hỏi */}
      {questions.map((q, index) => (
        <div
          key={q.id}
          className="q-main mb-5 p-3 border rounded shadow-sm bg-light"
        >
          <div className="q-content d-flex gap-3 align-items-start">
            <div className="form-floating flex-grow-1">
              <input
                type="text"
                className="form-control"
                placeholder="Nội dung câu hỏi"
                value={q.description}
                onChange={(e) =>
                  handleInputChange("QUESTION", q.id, e.target.value)
                }
              />
              <label>Câu hỏi {index + 1}:</label>
            </div>

            <div className="group-upload">
              <label
                htmlFor={`upload-${q.id}`}
                className="btn btn-outline-primary h-100 d-flex align-items-center"
              >
                <RiImageAddFill size={25} />
                {q.previewUrl && (
                  <div
                    className="text-muted small mt-1"
                    onClick={() => window.open(q.previewUrl, "_blank")}
                  >
                    {q.imageName}
                  </div>
                )}
              </label>
              <input
                type="file"
                id={`upload-${q.id}`}
                onChange={(e) => handleOnChangeFile(e, q.id)}
                hidden
              />
            </div>

            <div className="btn-add-remove d-flex gap-2">
              <AiOutlinePlusCircle
                className="icon-add text-success cursor-pointer"
                size={35}
                onClick={() => handleAddRemoveQuestion("ADD")}
              />
              {questions.length > 1 && (
                <IoTrashOutline
                  className="icon-remove text-danger cursor-pointer"
                  size={35}
                  onClick={() => handleAddRemoveQuestion("REMOVE", q.id)}
                />
              )}
            </div>
          </div>

          {/* Danh sách câu trả lời */}
          <div className="ms-5 mt-3">
            {q.answers.map((ans, ansIndex) => (
              <div
                key={ans.id}
                className="ans-content d-flex align-items-center gap-2 mb-2"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={ans.isCorrect}
                  onChange={(e) =>
                    handleInputChange(
                      "CHECKBOX",
                      q.id,
                      e.target.checked,
                      ans.id,
                    )
                  }
                />
                <div className="form-floating flex-grow-1">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Câu trả lời"
                    value={ans.description}
                    onChange={(e) =>
                      handleInputChange("ANSWER", q.id, e.target.value, ans.id)
                    }
                  />
                  <label>Câu trả lời {ansIndex + 1}</label>
                </div>
                <div className="ans-btn d-flex gap-1">
                  <AiOutlinePlusCircle
                    className="text-primary cursor-pointer"
                    size={25}
                    onClick={() => handleAddRemoveAnswer("ADD", q.id)}
                  />
                  {q.answers.length > 1 && (
                    <AiOutlineMinusCircle
                      className="text-warning cursor-pointer"
                      size={25}
                      onClick={() =>
                        handleAddRemoveAnswer("REMOVE", q.id, ans.id)
                      }
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        className="btn btn-warning mt-3 px-5 py-2 fw-bold"
        onClick={() => handleSubmit()}
      >
        Lưu câu hỏi
      </button>
    </div>
  );
};

export default ManageQuestion;
