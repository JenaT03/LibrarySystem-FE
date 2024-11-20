import createApiClient from "./api.service";
class ReaderService {
  constructor(baseUrl = "/api/readers") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }

  async get(id) {
    return (await this.api.get(`/${id}`)).data;
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
  async changeState(id, data) {
    return (await this.api.put(`/${id}/change-state`, data)).data;
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }

  async getByPhone(phone) {
    return (await this.api.get(`/phone/${phone}`)).data;
  }
}
export default new ReaderService();
