import http from "../services/httpService";

const url = process.env.REACT_APP_CLOUDINARY_URL;
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

export function uploadResource(file, resourceType) {
  console.log(file);
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  return http.post(`${url}/${resourceType}/upload`, formData);
}
