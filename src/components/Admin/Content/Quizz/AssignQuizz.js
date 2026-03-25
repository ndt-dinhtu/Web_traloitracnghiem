import React, { useEffect, useState } from "react";
import {
  getAllQuizForAdmin,
  getAllUser,
  quizAssignToUser,
} from "../../../../service/apiService";
import { toast } from "sonner";
import Select from "react-select";

const AssignQuizz = () => {
  const [listQuizz, setListQuizz] = useState([]);
  const [selectedQuizz, setSelectedQuizz] = useState(null);

  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

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
    }
  };

  const handleAssign = async () => {
    if (!selectedQuizz || !selectedUser) {
      toast.error("Vui lòng chọn đầy đủ Quiz và User!");
      return;
    }

    const quizId = selectedQuizz.value;
    const userId = selectedUser.value;

    const res = await quizAssignToUser(quizId,userId);
    if(res&&res.EC===0){
      setSelectedQuizz(null)
      setSelectedUser(null)
      toast.success(res.EM)
    }
    else{
      toast.error(res.EM)
    }
  };

  return (
    <div className="assign-quiz-container container mt-5">
      <div className="card shadow p-4 border-0">
        <div className="row g-4">
          <div className="col-md-6">
            <label className="form-label fw-bold">Chọn bài Quiz:</label>
            <Select
              value={selectedQuizz}
              onChange={setSelectedQuizz}
              options={listQuizz}
              placeholder="Tìm kiếm bài Quiz..."
              isClearable={true}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Chọn người dùng:</label>
            <Select
              value={selectedUser}
              onChange={setSelectedUser}
              options={listUser}
              placeholder="Tìm kiếm người dùng (email, tên, id)..."
              isClearable={true}
            />
          </div>

          <div className="col-12 text-center mt-5">
            <button
              className="btn btn-warning px-5 py-2 fw-bold shadow-sm"
              onClick={handleAssign}
            >
              Thực hiện Assign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignQuizz;
