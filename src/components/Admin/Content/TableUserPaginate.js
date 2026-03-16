

import ReactPaginate from "react-paginate";

const TableUserPaginate = ({
  listUsers,
  handleClickBtnUpdate,
  handleClickBtnDelete,
  fetchListUsersWithPagination,
  pageCount,
  currentPage,
  setCurrentPage,
}) => {
  const handlePageClick = (event) => {
    fetchListUsersWithPagination(+event.selected + 1);
    setCurrentPage(+event.selected + 1);
    
  };
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers.length > 0 ? (
            listUsers.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button className="btn btn-secondary">Info</button>
                    <button
                      onClick={() => handleClickBtnUpdate(item)}
                      className="btn btn-warning mx-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleClickBtnDelete(item)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="no-data" colSpan={5}>
                Not found data
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Pre"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </>
  );
};

export default TableUserPaginate;
