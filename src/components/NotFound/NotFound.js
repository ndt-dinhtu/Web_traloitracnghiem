import { Link } from "react-router-dom";
import "./NotFound.scss";
const NotFound = () => {
  return (
    <div className="notfound">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Trang bạn tìm không tồn tại.</p>

      <Link to="/">
        <button>Quay về trang chủ</button>
      </Link>
    </div>
  );
};

export default NotFound;
