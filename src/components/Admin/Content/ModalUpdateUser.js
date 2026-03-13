import { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GrAddCircle } from "react-icons/gr";
import { toast } from "sonner";
import { updateUser } from "../../../service/apiService";
import _ from "lodash";

const ModalUpdateUser = ({
  show,
  setShow,
  fetchListUsers,
  dataUpdate,
  resetUpdateData,
  fetchListUsersWithPagination,
  currentPage,
  setCurrentPage,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const usernameRef = useRef(null);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        usernameRef.current?.focus();
      }, 200);
    }
  }, [show]);

  useEffect(() => {
    if (dataUpdate && !_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email);
      setUsername(dataUpdate.username);
      setRole(dataUpdate.role);
      setImage();
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSumitCreateUser();
    }
  };

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreviewImage("");

    resetUpdateData();
  };

  const handleUploadFile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleSumitCreateUser = async () => {
    if (!username) {
      toast.error("Username is required");
      usernameRef.current?.focus();
      return;
    }

    const data = await updateUser(dataUpdate.id, username, role, image);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchListUsersWithPagination(currentPage);
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }

    console.log(">>> check res create user: ", data);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      backdrop="static"
      keyboard={false}
      className="modal-add-user"
    >
      <Modal.Header closeButton>
        <Modal.Title>Update User</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form className="row g-3" onKeyDown={onKeyDownHandler}>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              disabled
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              disabled
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Username</label>
            <input
              ref={usernameRef}
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div className="col-md-12">
            <label className="form-label label-upload" htmlFor="labelUpload">
              <GrAddCircle /> Upload Image
            </label>
            <input
              type="file"
              id="labelUpload"
              hidden
              onChange={handleUploadFile}
            />
          </div>

          <div className="col-md-12 img-preview">
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="img-fluid" />
            ) : (
              <span>Preview Image</span>
            )}
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>

        <Button variant="primary" onClick={handleSumitCreateUser}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUpdateUser;
