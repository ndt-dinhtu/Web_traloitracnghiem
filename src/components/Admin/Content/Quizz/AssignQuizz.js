import React, { useEffect, useState } from "react";
import { getAllQuizForAdmin, getAllUser } from "../../../../service/apiService";
import { toast } from "sonner";

const AssignQuizz = () => {
  const [listQuizz, setListQuizz] = useState([]);
  const [selectedQuizz, setSelectedQuizz] = useState("");
  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    fetchQuizz();
    fetchUser();
  }, []);

  const fetchQuizz = async () => {
    const res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let arrQuizz = res.DT.map((quizz) => ({
        value: quizz.id,
        label: `${quizz.id} - ${quizz.description}`,
      }));
      setListQuizz(arrQuizz);
    } else {
      toast.error("Có lỗi xảy ra khi tải thông tin bài quizz");
    }
  };

  const fetchUser = async () => {
    const res = await getAllUser();
    if (res && res.EC === 0) {
      let arrUser = res.DT.map((user) => ({
        value: user.id,
        label: `${user.id} - ${user.username} - ${user.email}`,
      }));
      setListUser(arrUser);
    } else {
      toast.error("Có lỗi xảy ra khi tải thông tin người dùng");
    }
  };

  return (
    <div className="assign-quiz-container container mt-5">
      <div className="card shadow p-4">
        <div className="row g-4">
          <div className="col-md-6">
            <label className="form-label fw-bold">Chọn bài Quiz:</label>
            <select
              className="form-select border-primary"
              value={selectedQuizz}
              onChange={(e) => setSelectedQuizz(e.target.value)}
            >
              <option value="">-- Vui lòng chọn bài Quiz --</option>
              {listQuizz.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Chọn người dùng:</label>
            <select
              className="form-select border-info"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">-- Vui lòng chọn User --</option>
              {listUser.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 text-center mt-4">
            <button className="btn btn-warning px-5 py-2 fw-bold shadow-sm">
              Thực hiện Assign (Gán bài)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignQuizz;
