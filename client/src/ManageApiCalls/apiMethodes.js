import axios from "axios";

const BASE_URL = "https://client-recorder-backend.vercel.app/api/v1/";

class ApiMethods {
  static apiRequest(method, url, body = {}) {
    url = BASE_URL + url;
    const token = localStorage.getItem("accessToken");

    // const headers = {
    //   "Content-Type": "multipart/form-data",
    //   // "Accept": "application/json",
    //   // "Content-Type": "application/json"
    //   ...(token && { Authorization: `Bearer ${token}` }),
    // },

    return new Promise((resolve, reject) => {
      axios({
        method,
        url,
        data: body,
        headers:  {
          "Content-Type": "multipart/form-data",
          // "Accept": "application/json",
          // "Content-Type": "application/json"
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        withCredentials: true, 
      })
        .then((response) => {
          resolve(response.data);
        }) // Accessing the response data
        .catch((error) => {
          console.log("API request failed", error);
          reject(error);
        });
    });
  }

  static get(url) {
    return this.apiRequest("GET", url);
  }

  static post(url, data) {
    return this.apiRequest("POST", url, data);
  }

  static patch(url, data) {
    return this.apiRequest("PATCH", url, data);
  }

  static delete(url) {
    return this.apiRequest("DELETE", url);
  }
}

export default ApiMethods;
