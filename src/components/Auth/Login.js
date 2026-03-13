import React, { useState } from "react";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Check login data:", { email, password });
    // Tại đây bạn sẽ gọi API login của mình
  };




  return (
    <div className="login-container">
      <div className="login-box">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="header">
            <h2>Đăng Nhập</h2>
            <p>Chào mừng bạn quay trở lại!</p>
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="actions">
            <label className="remember-me">
              <input type="checkbox" /> Ghi nhớ tôi
            </label>
            <a href="/forgot-password">Quên mật khẩu?</a>
          </div>

          <button type="submit" className="btn-submit" >
            Đăng nhập ngay
          </button>

          <div className="signup-link">
            Chưa có tài khoản? <a href="/register">Đăng ký</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
