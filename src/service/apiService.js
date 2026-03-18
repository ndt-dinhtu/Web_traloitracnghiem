import axios from "../utils/axiosCustomize";

const postCreateNewUser = async (email, password, username, role, image) => {
  let formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("username", username);
  formData.append("role", role);
  formData.append("userImage", image);

  return await axios.post("api/v1/participant", formData);
};

const getAllUser = async () => {
  return await axios.get("api/v1/participant/all");
};

const updateUser = async (id, username, role, imgae) => {
  let fromData = new FormData();
  fromData.append("id", id);
  fromData.append("username", username);
  fromData.append("role", role);
  fromData.append("userImage", imgae);

  return await axios.put("api/v1/participant", fromData);
};

const deleteUser = async (userId) => {
  return await axios.delete("api/v1/participant", { data: { id: userId } });
};

const getAllUserWithPagination = async (page, limit) => {
  return await axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = async (email, password) => {
  return await axios.post("api/v1/login", { email, password });
};

const postRegister = async (email, password, username) => {
  return await axios.post("api/v1/register", { email, password, username });
};

const getQuizzUser = async () => {
  return await axios.get("api/v1/quiz-by-participant");
};

const getDataQuiz = async (id) => {
  return await axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = async (data) => {
  return await axios.post(`api/v1/quiz-submit`, { ...data });
};

const postCreateNewQuizz = async (description, name, difficulty, quizImage) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  return await axios.post(`api/v1/quiz`, data);
};
export {
  postCreateNewUser,
  getAllUser,
  updateUser,
  deleteUser,
  getAllUserWithPagination,
  postLogin,
  postRegister,
  getQuizzUser,
  getDataQuiz,
  postSubmitQuiz,
  postCreateNewQuizz,
};
