import * as yup from "yup";

const AlbumSchema = yup.object().shape({
  title: yup.string().required("Name is required"),
  released_date: yup.string().required("Please enter a correct date."),
  //   genres: yup.string().required("Please insert a genre"),
  //   tracks: yup.string().required("Select at least one song"),
  //   input_album_cover: yup.string().required("Please Upload an Image"),
});

export default AlbumSchema;
