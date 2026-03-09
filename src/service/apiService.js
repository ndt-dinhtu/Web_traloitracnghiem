
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


export { postCreateNewUser };