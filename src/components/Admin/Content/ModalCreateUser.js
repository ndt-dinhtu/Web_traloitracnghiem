import { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GrAddCircle } from "react-icons/gr";
import { toast } from "sonner";
import { postCreateNewUser } from "../../../service/apiService";

const ModalCareteUser = ({
  show,
  setShow,
  fetchListUsers,
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

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        emailRef.current?.focus();
      }, 200);
    }
  }, [show]);

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
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleSumitCreateUser = async () => {
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      toast.error("Invalid email");
      emailRef.current?.focus();
      return;
    }

    if (!password) {
      toast.error("Password is required");
      passwordRef.current?.focus();
      return;
    }

    if (!username) {
      toast.error("Username is required");
      usernameRef.current?.focus();
      return;
    }

    const data = await postCreateNewUser(
      email,
      password,
      username,
      role,
      image,
    );

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // fetchListUsers()
      setCurrentPage(1);
      await fetchListUsersWithPagination(1);
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
        <Modal.Title>Add new User</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form className="row g-3" onKeyDown={onKeyDownHandler}>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              ref={emailRef}
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              ref={passwordRef}
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

export default ModalCareteUser;
