import axios from "axios";

export function getUser(id) {
  return axios.get(`http://localhost:4000/users/${id}`);
}
