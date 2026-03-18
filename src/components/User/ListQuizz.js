import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getQuizzUser } from "../../service/apiService";
import "./ListQuizz.scss";
import { useNavigate } from "react-router-dom";

function ListQuizz() {
  const [arrQuizz, setArrQuizz] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    getQuizzData();
  }, []);

  const getQuizzData = async () => {
    setIsLoading(true);
    const res = await getQuizzUser();
    if (res && res.EC === 0) {
      setArrQuizz(res.DT);
    }
    setIsLoading(false);
  };

  const renderLoading = () => {
    return [1, 2, 3, 4].map((i) => (
      <Card key={`skeleton-${i}`} className="quiz-card skeleton">
        <div className="skeleton-img"></div>
        <Card.Body>
          <div className="skeleton-text title"></div>
          <div className="skeleton-text detail"></div>
          <div className="skeleton-text detail"></div>
          <div className="skeleton-btn"></div>
        </Card.Body>
      </Card>
    ));
  };

  return (
    <div className="list-quiz-container">
      {isLoading ? (
        renderLoading()
      ) : arrQuizz && arrQuizz.length > 0 ? (
        arrQuizz.map((item, index) => (
          <Card key={`${index}-quiz`} className="quiz-card">
            <div className="card-img-wrapper">
              <Card.Img
                variant="top" 
                src={`data:image/jpeg;base64,${item.image}`}
              />
            </div>
            <Card.Body>
              <Card.Title className="quiz-title">{item.name}</Card.Title>
              <Card.Text className="quiz-description">
                {item.description ||
                  "Hãy bắt đầu bài thi để kiểm tra kiến thức của bạn!"}
              </Card.Text>
              <Button
                variant="primary"
                className="btn-start"
                onClick={()=>navigate(`/quiz/${item.id}`,{state:{quizTitle:item.description }})}
              >
                Bắt đầu ngay
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div className="no-data">Hiện không có bài thi nào khả dụng.</div>
      )}
    </div>
  );
}

export default ListQuizz;
