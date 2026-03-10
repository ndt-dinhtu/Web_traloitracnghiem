
const TableUser = ({listUsers,handleClickBtnUpdate,handleClickBtnDelete}) => {
  

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
                    <button onClick={()=>handleClickBtnUpdate(item)} className="btn btn-warning mx-3">Edit</button>
                    <button onClick={()=>handleClickBtnDelete(item)} className="btn btn-danger">Delete</button>
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
    </>
  );
};

export default TableUser;
