import React, { useState } from "react";
import "./ManagerQuizz.scss";
import { FcPlus } from "react-icons/fc";
import { IoCloseCircle, IoTrashOutline } from "react-icons/io5";
import { postCreateNewQuizz } from "../../../../service/apiService";
import { toast } from "sonner";

const ManagerQuizz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [isPreviewMaximized, setIsPreviewMaximized] = useState(false);

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {

      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }

      const file = event.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage("");
    setImage(null);
    document.getElementById("labelUpload").value = "";
  };

  const handleSubmitQuiz = async () => {
    if (!name || !description) {
      toast.error("Vui lòng nhập tên và mô tả!");
      return;
    }
    if (!image) {
      toast.error("Vui lòng thêm ảnh");
      return;
    }

    const res = await postCreateNewQuizz(description, name, difficulty, image);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setDifficulty("EASY");
      setImage(null);
      if (previewImage) URL.revokeObjectURL(previewImage);
      setPreviewImage("");
      document.getElementById("labelUpload").value = "";
    } else {
      toast.error(res?.EM || "Đã có lỗi xảy ra");
    }
  };
  return (
    <div className="quiz-manager-container">
      <div className="title">Quản lý bài thi Quizz</div>
      <hr />

      <div className="quiz-form-horizontal">
        <div className="right-side">
          <div className="form-group mb-3">
            <label>Tên bài Quiz</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: Lập trình React cơ bản..."
            />
          </div>

          <div className="form-group mb-3">
            <label>Mô tả bài thi</label>
            <textarea
              className="form-control"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả ngắn ..."
            />
          </div>

          <div className="form-group mb-4">
            <label>Độ khó</label>
            <select
              className="form-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="EASY">Dễ (Easy)</option>
              <option value="MEDIUM">Vừa (Medium)</option>
              <option value="HARD">Khó (Hard)</option>
            </select>
          </div>

          <button className="btn btn-submit" onClick={handleSubmitQuiz}>
            Lưu bài Quiz
          </button>
        </div>

        <div className="left-side">
          <div
            className={`img-preview-wrapper ${previewImage ? "has-img" : ""}`}
            onClick={() => previewImage && setIsPreviewMaximized(true)}
          >
            {previewImage ? (
              <>
                <img src={previewImage} alt="preview" />
                <div
                  className="remove-btn"
                  onClick={handleRemoveImage}
                  title="Xóa ảnh"
                >
                  <IoTrashOutline />
                </div>
                <div className="zoom-label">Click để phóng to</div>
              </>
            ) : (
              <div className="no-img">
                <FcPlus size={40} />
                <span>Chọn ảnh bìa</span>
              </div>
            )}
          </div>

          <label className="btn-upload-custom" htmlFor="labelUpload">
            {previewImage ? "Thay đổi hình ảnh" : "Tải ảnh lên"}
          </label>
          <input
            type="file"
            hidden
            id="labelUpload"
            onChange={(e) => handleUploadImage(e)}
            accept="image/*"
          />
        </div>
      </div>

      {isPreviewMaximized && (
        <div
          className="image-maximized-overlay"
          onClick={() => setIsPreviewMaximized(false)}
        >
          <IoCloseCircle className="close-icon" />
          <img src={previewImage} alt="maximized" />
        </div>
      )}
    </div>
  );
};

export default ManagerQuizz;
