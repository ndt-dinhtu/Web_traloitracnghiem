import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { postLogin } from "../../service/apiService";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner9 } from "react-icons/im";  

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let data = await postLogin(email, password);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      dispatch(doLogin(data));
      setIsLoading(false);
      navigate("/");
    } else {
      setIsLoading(false);
      toast.error(data.EM);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-box">
     
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

          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? <ImSpinner9 className="loader-icon" /> :<span> Đăng nhập ngay</span>}  
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
