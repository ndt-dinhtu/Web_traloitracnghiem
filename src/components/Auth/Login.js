import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { postLogin } from "../../service/apiService";
import { toast } from "sonner";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    let data = await postLogin(email, password);

    if(data && data.EC===0){
      toast.success(data.EM);
      navigate("/");
    }else{
      alert(data.EM);
      toast.error(data.EM);
    }
  };

  const handleGoBack = () => {
    navigate("/"); 
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Nút quay lại */}
        <div className="back-button" onClick={handleGoBack}>
          <span>&#171;</span> Quay lại trang chủ
        </div>

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

          <button type="submit" className="btn-submit">
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