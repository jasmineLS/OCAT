import Axios from '../utils/http.config';

export class AssessmentService {
  static async submit(assessment) {
    try {
      const response = await Axios.post(`/assessment`, assessment);
      return response.data.result;
    } catch (err) {
      const statusText = err?.response?.statusText || `Request Failed`;
      const message = err?.response?.data?.message || err?.message || `Unknown error`;
      throw new Error(`${statusText} - ${message}`);
    }
  }

  static async getList() {
    try {
      const response = await Axios.get(`/assessment/list`);
      console.log(`Fetched assessments from API:`, response.data?.data?.results);
      return response.data?.data?.results || [];
    } catch (err) {
      const statusText = err?.response?.statusText || `Request Failed`;
      const message = err?.response?.data?.message || err?.message || `Unknown error`;
      throw new Error(`${statusText} - ${message}`);
    }
  }

  static async getFilteredList(filters) {
    try {
      const response = await Axios.get(`/assessment/list`, { params: filters }); // Corrected endpoint
      console.log(`Fetched filtered assessments from API:`, response.data.rows); // Log the response
      return response.data.rows; // Return the rows from the response
    } catch (error) {
      console.error(`Error fetching filtered assessments:`, error.message);
      throw error;
    }
  }
}
