import createApiClient from "./api.service";
class BookService {
  constructor(baseUrl = "/api/books") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }
  async create(data) {
    return (
      await this.api.post("/", data, {
        headers: {
          "Content-Type": "multipart/form-data", //  gửi tệp tin cùng với các dữ liệu khác qua HTTP.
        },
      })
    ).data;
  }
  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async update(id, data) {
    return (
      await this.api.put(`/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
  async getLatestBook() {
    return (await this.api.get("/current-year")).data;
  }
}
export default new BookService();
