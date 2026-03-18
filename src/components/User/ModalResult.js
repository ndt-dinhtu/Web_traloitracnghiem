import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsCheckCircleFill } from "react-icons/bs"; 
import "./ModalResult.scss"; 

const ModalResult = ({ show, setShow, dataModalResult }) => {
  const handleClose = () => setShow(false);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="modal-result-container" 
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <BsCheckCircleFill className="result-icon" />
          Kết quả bài thi của bạn
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="result-info">
          <div className="result-item">
            <span>Tổng số câu hỏi:</span>
            <span className="value">{dataModalResult.countTotal}</span>
          </div>
          <div className="result-item correct">
            <span>Số câu trả lời đúng:</span>
            <span className="value">{dataModalResult.countCorrect}</span>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Xem đáp án
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalResult;
