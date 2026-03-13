import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CgDanger } from "react-icons/cg";
import { SiGmail } from "react-icons/si";
import { FaRegUser } from "react-icons/fa";
import { deleteUser } from "../../../service/apiService";
import { toast } from "sonner";

const ModalDeleteUser = ({
  show,
  setShow,
  dataDelete,
  fetchListUsers,
  fetchListUsersWithPagination,
  currentPage,
  setCurrentPage,
}) => {
  const handleClose = () => setShow(false);
  const handleSubmitDeleteUser = async () => {
    const data = await deleteUser(dataDelete.id);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // fetchListUsers();
      setCurrentPage(1);
      await fetchListUsersWithPagination(1);
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="modal-delete-user"
    >
      <Modal.Header closeButton>
        <Modal.Title className="delete-title">
          <CgDanger className="danger-icon" />
          Delete User
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="delete-text">
          Are you sure you want to delete this user?
        </p>

        <div className="delete-user-info">
          <h5>
            {dataDelete && dataDelete.username ? (
              <>
                <FaRegUser />
                UserName :{dataDelete?.username}
              </>
            ) : (
              ""
            )}
          </h5>
          <p>
            {dataDelete && dataDelete.email ? (
              <>
                <SiGmail />
                Gmail :{dataDelete?.email}
              </>
            ) : (
              ""
            )}
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>

        <Button variant="danger" onClick={() => handleSubmitDeleteUser()}>
          Yes, Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteUser;
