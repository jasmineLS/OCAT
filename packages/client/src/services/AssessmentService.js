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
      // Choose the correct method, url, and data to send
      // in a request to the express packages/api/src/routes/assessment.js
      // NOTE: the http.config file automatically adds /api to the front of your url
      const response = await Axios.get(`/assessment`, {
        params: {
        },
      });
      return response.data.data.assessment;
    } catch (err) {
      const statusText = err?.response?.statusText || `Request Failed`;
      const message = err?.response?.data?.message || err?.message || `Unknown error`;
      throw new Error(`${statusText} - ${message}`);
    }
  }
}

/* export class AssessmentService {
  static async submit(assessment) {
    try {
      const response = await Axios.post(`/assessment`, { assessment });
      return response.data;
    } catch (err) {
      throw new Error(`${err?.response?.statusText || `Error`} - ${err?.response?.data?.message || err.message}`);
    }
  }

  static async getList() {
    try {
      const response = await Axios.get(`/assessment`, {
        params: {
          // Add query parameters here if needed
        },
      });

      return response.data.data.assessment;
    } catch (err) {
      throw new Error(
        `${err?.response?.statusText || `Error`} - ${err?.response?.data?.message || err.message}`
      );
    }
  }
} */
