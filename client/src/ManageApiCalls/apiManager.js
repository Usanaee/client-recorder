import ENDPOINTS from "./endpoints";
import ApiMethods from "./apiMethodes";

class ApiManager {
  static getAllClients = () => {
    const url = ENDPOINTS.GET_ALL_CLIENTS;
    return ApiMethods.get(url);
  };
  static getSingleAdmin = () => {
    const url = ENDPOINTS.GET_SINGLE_ADMIN;
    return ApiMethods.get(url);
  };
  static deleteClient = (id) => {
    const url = `${ENDPOINTS.DELETE_CLIENT}/${id}`;
    return ApiMethods.delete(url);
  };
  static updateClient = (id,data) => {
    const url = `${ENDPOINTS.UPDATE_CLIENT}/${id}`;
    return ApiMethods.patch(url,data);
  };
  static addClient = (data) => {
    const url = ENDPOINTS.ADD_CLIENT;
    return ApiMethods.post(url,data);
  };
  static register = (data) => {
    const url = ENDPOINTS.REGISTER;
    return ApiMethods.post(url,data);
  };
  static login = (data) => {
    const url = ENDPOINTS.LOGIN;
    return ApiMethods.post(url,data);
  };
  static logout = () => {
    const url = ENDPOINTS.LOGOUT;
    return ApiMethods.post(url);
  };
  static changePassword = (data) => {

    const url = ENDPOINTS.CHANGE_PASSWORD;
    return ApiMethods.post(url,data);
  };
  static changeImage = (data) => {
    const url = ENDPOINTS.CHANGE_IMAGE;
    return ApiMethods.post(url,data);
  };

}

export default ApiManager;
