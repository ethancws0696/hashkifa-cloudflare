import axios from "axios";
const baseURL = process.env.apiUrl;
export default class UserAPI {
  static homefeaturevideo() {
    return axios(`${baseURL}/api/v1/homefeaturevideo`);
  }

  static browsefeaturevideo() {
    return axios(`${baseURL}/api/v1/homefeaturevideo?type=list`);
  }

  static homefreevideo() {
    return axios(`${baseURL}/api/v1/homefreevideo`);
  }

  static newsletter(email) {
    return axios.post(`${baseURL}/api/v1/newsletter`, email);
  }

  static contactus(data) {
    return axios.post(`${baseURL}/api/v1/contactus`, data);
  }

  static getVideopackage(data) {
    return axios.get(`${baseURL}/api/v1/videobyid/${data}`);
  }

  static validateUser(data) {
    const headers = {
      Authorization: "Bearer ".concat(data),
    };
    return axios.get(`${baseURL}/api/v1/validate_user`, {
      headers: headers,
    });
  }

  static placeorder(data, cookie) {
    if (cookie) {
      const headers = {
        Authorization: "Bearer ".concat(cookie),
      };
      return axios.post(`${baseURL}/api/v1/place/order`, data, {
        headers: headers,
      });
    } else {
      return axios.post(`${baseURL}/api/v1/place/order`, data);
    }
  }

  static getSavedCards(cookie) {
    const headers = {
      Authorization: "Bearer ".concat(cookie),
    };
    return axios.get(`${baseURL}/api/v1/my/saved/cards`, {
      headers: headers,
    });
  }

  static donate(data) {
    return axios.post(`${baseURL}/api/v1/one-time-donation`, data);
  }

  static purchase(data) {
    const headers = {
      Authorization: "Bearer ".concat(data),
    };
    return axios.get(`${baseURL}/api/v1/myorders`, {
      headers: headers,
    });
  }

  static videos(data, url) {
    const headers = {
      Authorization: "Bearer ".concat(data),
    };
    return axios.get(url, {
      headers: headers,
    });
  }

  static videoAccess(cookie, id) {
    const headers = {
      Authorization: "Bearer ".concat(cookie),
    };
    return axios.get(`${baseURL}/api/v1/video/access/${id}`, {
      headers: headers,
    });
  }

  static videoAccessAlt(cookie, id) {
    const headers = {
      Authorization: "Bearer ".concat(cookie),
    };
    return axios.get(`${baseURL}/api/v1/video/access/${id}?type=alt_link`, {
      headers: headers,
    });
  }

  static promoCode(data) {
    return axios.post(`${baseURL}/api/v1/promo-code/apply`, data);
  }

  static cardDelete(data, cookie) {
    const headers = {
      Authorization: "Bearer ".concat(cookie),
    };
    return axios.get(`${baseURL}/api/v1/payment-method/remove/${data}`, {
      headers: headers,
    });
  }

  static cardAllDelete(data, cookie) {
    const headers = {
      Authorization: "Bearer ".concat(cookie),
    };
    const apiEndpoints = [];
    for (let i = 0; i <= data.length; i++) {
      var cardData = data[i];
      if (cardData && cardData.id) {
        const id = cardData.id;
        const endPointUrl = `${baseURL}/api/v1/payment-method/remove/${id}`;
        apiEndpoints.push(endPointUrl);
      }
    }
    return axios.all(
      apiEndpoints.map((endpoint) =>
        axios.get(endpoint, {
          headers: headers,
        })
      )
    );
  }

  static userDetails(cookie) {
    const headers = {
      Authorization: "Bearer ".concat(cookie),
    };
    return axios.get(`${baseURL}/api/v1/user-details`, {
      headers: headers,
    });
  }

  static updateDetails(cookie, data) {
    const headers = {
      Authorization: "Bearer ".concat(cookie),
    };
    return axios.post(`${baseURL}/api/v1/me/update`, data, {
      headers: headers,
    });
  }

  static resetPwdUser(cookie, data) {
    const headers = {
      Authorization: "Bearer ".concat(cookie),
    };
    return axios.post(`${baseURL}/api/v1/me/password/update`, data, {
      headers: headers,
    });
  }

  static orderDetails(cookie, data) {
    const headers = {
      Authorization: "Bearer ".concat(cookie),
    };
    return axios.get(`${baseURL}/api/v1/orderdetail/${data}`, {
      headers: headers,
    });
  }

  static help(data) {
    return axios.post(`${baseURL}/api/v1/help`, data);
  }
}
