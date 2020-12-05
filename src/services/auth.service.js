import axios from "../connections";

class AuthService {
  login(username, password) {
    return axios
      .post("api/auth/signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post("api/auth/signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();