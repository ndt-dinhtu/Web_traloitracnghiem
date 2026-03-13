import ModalCareteUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { GrAddCircle } from "react-icons/gr";

import { useEffect, useState } from "react";
import {
  getAllUser,
  getAllUserWithPagination,
} from "../../../service/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

export const ManageUser = () => {
  const LIMIT_USER = 2;
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchListUsersWithPagination(1);
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUser();

    if (res && res.DT && res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  const fetchListUsersWithPagination = async (page, limit) => {
    let res = await getAllUserWithPagination(page, LIMIT_USER);

    if (res && res.DT && res.EC === 0) {
      console.log("check res pagination: ", res.DT);
      setListUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };

  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };

  const resetUpdateData = () => {
    setDataUpdate({});
  };

  const handleClickBtnDelete = (user) => {
    setShowModalDeleteUser(true);
    setDataDelete(user);
  };

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
          {/* <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnDelete={handleClickBtnDelete}
          /> */}

          <TableUserPaginate
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnDelete={handleClickBtnDelete}
            fetchListUsersWithPagination={fetchListUsersWithPagination}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <ModalCareteUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPagination={fetchListUsersWithPagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          fetchListUsers={fetchListUsers}
          resetUpdateData={resetUpdateData}
          fetchListUsersWithPagination={fetchListUsersWithPagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPagination={fetchListUsersWithPagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
