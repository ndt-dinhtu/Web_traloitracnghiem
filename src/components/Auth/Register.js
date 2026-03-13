import React, { useState } from "react";
import "./Register.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    console.log("Dữ liệu đăng ký:", { email, username, password });
    // Gọi API đăng ký tại đây
  };

  return (
    <div className="register-container">
      <div className="register-box">
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

          <div className="input-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Tối thiểu 6 ký tự"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-register">
            Đăng ký tài khoản
          </button>

          <div className="login-link">
            Đã có tài khoản? <a href="/login">Đăng nhập</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
