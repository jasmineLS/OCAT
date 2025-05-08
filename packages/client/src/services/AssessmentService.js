import Axios from '../utils/http.config'; // Axios configuration

export class AssessmentService {
  static async submit(assessment) {
    try {
      // Send assessment data directly in the request body (no extra object wrapping)
      const response = await Axios.post(`/assessment`, assessment);
      return response.data; // Return the response data to the caller
    } catch (err) {
      // Handle errors
      const statusText = err?.response?.statusText || `Request Failed`;
      const message = err?.response?.data?.message || err?.message || `Unknown error`;
      throw new Error(`${statusText} - ${message}`);
    }
  }

  static async getList() {
    try {
      const response = await Axios.get(`/assessment`);
      return response.data; // Ensure this matches the API response structure
    } catch (err) {
      const statusText = err?.response?.statusText || `Request Failed`;
      const message = err?.response?.data?.message || err?.message || `Unknown error`;
      throw new Error(`${statusText} - ${message}`);
    }
  }
}
