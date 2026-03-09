import ModalCareteUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { useState } from "react";
import { GrAddCircle } from "react-icons/gr";
export const ManageUser = () => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateUser(true)}
          >
            <GrAddCircle />
            Add new User
          </button>
        </div>
        <div className="tables-users-container">
          <div>table user</div>
        </div>

        <ModalCareteUser show={showModalCreateUser} setShow={setShowModalCreateUser} />
      </div>
    </div>
  );
};
