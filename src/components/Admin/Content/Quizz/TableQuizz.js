import React, { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../service/apiService";
import "./TableQuizz.scss";

const TableQuizz = () => {
  const [listQuiz, setListQuiz] = useState([]);

  const getDataQuizAll = async () => {
    const res = await getAllQuizForAdmin();
    console.log(res);

    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  useEffect(() => {
    getDataQuizAll();
  }, []);

  const handleEdit = (quiz) => {
    console.log("Edit:", quiz);
  };

  const handleDelete = (quiz) => {
    console.log("Delete:", quiz);
  };

  return (
    <div className="table-quizz-container">


      <table className="table-quizz">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Difficulty</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {listQuiz && listQuiz.length > 0 ? (
            listQuiz.map((quiz) => (
              <tr key={quiz.id}>
                <td>{quiz.id}</td>
                <td>{quiz.name}</td>
                <td>{quiz.description}</td>
                <td>
                  <span className={`badge ${quiz.difficulty.toLowerCase()}`}>
                    {quiz.difficulty}
                  </span>
                </td>
                <td>
                  {quiz.image ? (
                    <img
                      src={`data:image/jpeg;base64,${quiz.image}`}
                      alt="quiz"
                    />
                  ) : (
                    "No image"
                  )}
                </td>
                <td>
                  <button className="btn edit" onClick={() => handleEdit(quiz)}>
                    Edit
                  </button>
                  <button
                    className="btn delete"
                    onClick={() => handleDelete(quiz)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableQuizz;
