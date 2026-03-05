import ModalCareteUser from "./ModalCreateUser";

export const ManageUser = () => {
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <button>Add new User</button>
        <div>table user</div>
        <ModalCareteUser />
      </div>
    </div>
  );
};
