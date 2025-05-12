import Axios from '../utils/http.config';

export class AssessmentService {
  static async submit(assessment) {
    try {
      const response = await Axios.post(`/assessment`, assessment);
      return response.data.result;
    } catch (err) {
      throw new Error(err?.response?.data?.message || err.message || `Unknown error`);
    }
  }

  static async getList() {
    try {
      const response = await Axios.get(`/assessment/list`);
      return response.data?.data?.results || [];
    } catch (err) {
      throw new Error(err?.response?.data?.message || err.message || `Unknown error`);
    }
  }

  static async getFilteredList(filters) {
    try {
      const response = await Axios.get(`/assessment/filtered`, { params: filters });
      return response.data.rows; // Return the rows from the response
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message || `Unknown error`);
    }
  }
}
