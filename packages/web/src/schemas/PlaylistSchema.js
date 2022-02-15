import * as yup from "yup";

const PlaylistSchema = yup.object().shape({
  title: yup.string().required("Name is required"),
  description: yup.string().required("Please enter a Description"),
  color: yup.string().required("What Color will your playlist be?"),
  //   tracks: yup.string().required("Select at least one song"),
  //   input_album_cover: yup.string().required("Please Upload an Image"),
});

export default PlaylistSchema;
