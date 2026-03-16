import React from "react";
import videoHomePage from "../../assets/homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  return (
    <>
      <div className="homepage-container">
        <video autoPlay muted loop>
          <source src={videoHomePage} type="video/mp4" />
        </video>
        <div className="homepage-content">
          <div className="title-1">Looks striking. Feels effortless.</div>
          <div className="title-2">
            Impryess your form takers. Catch their eye with striking visuals,
            and make form-filling feel effortless by replacing walls of
            questions with just one at a time.
          </div>
          <div className="title-3 ">
            {isAuthenticated ? (
              <button onClick={()=>navigate("/users")}> Get's stared. It's free</button>
            ) : (
              <button onClick={()=>navigate("/login")}>Đăng nhập nhanh để làm bài thi</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
