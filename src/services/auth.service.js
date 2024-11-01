import createApiClient from "./api.service";
class AuthService {
  constructor(baseUrl = "/api/auth") {
    this.api = createApiClient(baseUrl);
  }

  async register(data) {
    return (await this.api.post("/register", data)).data;
  }

  async staffLogin(data) {
    return (await this.api.post("/staff-login", data)).data;
  }

  async readerLogin(data) {
    return (await this.api.post("/reader-login", data)).data;
  }
}
export default new AuthService();
