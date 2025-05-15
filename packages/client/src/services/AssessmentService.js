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
      // Ensure filters include limit and offset for pagination
      const response = await Axios.get(`/assessment/filtered`, { params: filters });
      const { count, currentPage, rows, totalPages } = response.data || {};
      if (!rows) {
        throw new Error(`Invalid response structure: rows not found`);
      }
      return { count, currentPage, rows, totalPages }; // Return pagination metadata
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message || `Unknown error`);
    }
  }

  static async delete(id) {
    try {
      const response = await Axios.delete(`/assessment/${id}`);
      return response.data; // Return the response data directly
    } catch (err) {
      if (err.response?.status === 404) {
        throw new Error(`Assessment with ID ${id} not found or already deleted`);
      }
      throw new Error(err?.response?.data?.message || err.message || `Unknown error`);
    }
  }
}

export default AssessmentService; // Ensure default export
