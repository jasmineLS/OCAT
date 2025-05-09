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
}
