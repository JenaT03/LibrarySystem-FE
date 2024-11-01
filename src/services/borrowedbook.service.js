import createApiClient from "./api.service";
class BorrowedBookService {
  constructor(baseUrl = "/api/borrowedbooks") {
    this.api = createApiClient(baseUrl);
  }

  async create(data) {
    return (await this.api.post("/", data)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  async getByState(state) {
    return (await this.api.get(`/${state}`)).data;
  }
}
export default new BorrowedBookService();
