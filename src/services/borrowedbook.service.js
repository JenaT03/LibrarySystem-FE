import createApiClient from "./api.service";
class BorrowedBookService {
  constructor(baseUrl = "/api/borrowedbooks") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }
  async getBorrowsOfReader(id) {
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

  async getByState(state) {
    return (await this.api.get(`/state/${state}`)).data;
  }

  async getOverDueBorrows() {
    return (await this.api.get(`/borrows/overdue`)).data;
  }

  async getRejectedBorrows() {
    return (await this.api.get(`/borrows/rejected`)).data;
  }

  async getOutOfStockBooks() {
    return (await this.api.get(`/borrows/out-of-stock-books`)).data;
  }

  async renewBorrow(id) {
    return (await this.api.put(`/renew/${id}`)).data;
  }
}
export default new BorrowedBookService();
