import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GrAddCircle } from "react-icons/gr";
import axios from "axios";
import { toast } from "sonner";

const ModalCareteUser = ({ show, setShow }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [prewiewImage, setPreviewImage] = useState("");

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
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
  };

  const handleUploadFile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleSumitCreateUser = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    if (!username) {
      toast.error("Username is required");
      return;
    }

    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    formData.append("role", role);
    formData.append("userImage", image);

    const res = await axios.post(
      "http://localhost:8081/api/v1/participant",
      formData,
    );

    if (res.data && res.data.EC === 0) {
      toast.success(res.data.EM);
      handleClose();
    }

    if (res.data && res.data.EC !== 0) {
      toast.error(res.data.EM);
    }
    console.log(">>> check res create user: ", res.data);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        keyboard={false}
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new User</Modal.Title>
          <button onClick={() => toast.success("Test Sonner")}>Test</button>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3" onKeyDown={onKeyDownHandler}>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
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
                <GrAddCircle /> Upload-image
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                className="form-control"
                onChange={(e) => handleUploadFile(e)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {prewiewImage ? (
                <img src={prewiewImage} alt="Preview" className="img-fluid" />
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
          <Button variant="primary" onClick={() => handleSumitCreateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCareteUser;
