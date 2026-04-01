import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "../../service/apiService";
import { toast } from "sonner";
import { doLogOut } from "../../redux/action/userAction";
const Header = () => {
  const { isAuthenticated, account } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = async () => {
    const rs = await LogOut(account.email, account.refresh_token);

    if (rs && rs.EC === 0) {
      toast.success(rs.EM);
      dispatch(doLogOut());
      navigate("/login");
    } else {
      toast.error(rs.EM);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink to="/" className="navbar-brand">
            Home
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/users" className="nav-link">
                User
              </NavLink>
              <NavLink to="/admins" className="nav-link">
                Admin
              </NavLink>
            </Nav>
            <Nav>
              {isAuthenticated ? (
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogout()}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <button className="btn-login" onClick={() => handleLogin()}>
                    Log in
                  </button>
                  <button
                    className="btn-signup"
                    onClick={() => handleRegister()}
                  >
                    Sign up
                  </button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
