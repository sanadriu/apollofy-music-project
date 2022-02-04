import * as yup from "yup";
import validator from "validator";

const AccountSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  released_date: yup.string().required("Release date is required"),
  genres: yup.array().of(yup.string()),
  url_track: yup
    .string()
    .required("Track is required")
    .test("validate-track", "Track must be a valid URL", function validation(value) {
      return value && validator.isURL(value);
    }),
  url_image: yup
    .string()
    .required("Cover image is required")
    .test("validate-image", "Cover image must be a valid URL", function validation(value) {
      return value && validator.isURL(value);
    }),
});

export default AccountSchema;
