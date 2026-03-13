import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { postRegister } from "../../service/apiService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    const data = await postRegister(email, password, username);
    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/");
    } else {
      toast.error(data.EM);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="back-button" onClick={() => navigate("/")}>
          <span>&#171;</span> Quay lại trang chủ
        </div>

        <form className="register-form" onSubmit={handleRegister}>
          <div className="header">
            <h2>Tạo Tài Khoản</h2>
            <p>Bắt đầu hành trình của bạn ngay hôm nay</p>
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              placeholder="username123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group password-group">
            <label>Mật khẩu</label>
            <div className="input-wrapper">
              <input
                type={isShowPassword ? "text" : "password"}
                placeholder="Tối thiểu 6 ký tự"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="icons-eye"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="input-group password-group">
            <label>Xác nhận mật khẩu</label>
            <div className="input-wrapper">
              <input
                type={isShowPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-register">
            Đăng ký tài khoản
          </button>

          <div className="login-link">
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
