import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Input,
  InputLabel,
  Select,
  TextField,
  Container,
  MenuItem,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { uploadResource } from "../../../../api/api-cloudinary";
import { MiddleTitle } from "../../../atoms/MiddleTitle/MiddleTitle";
import withLayout from "../../../hoc/withLayout";

const initialValues = {
  title: "",
  released_date: "",
  genres: [],
  url_track: "",
  url_image: "",
};

const genres = ["Rock", "Pop", "Hip Hop", "Haroon Metal"];
const allowedImageExt = ["jpg", "jpeg", "png", "svg"];
const allowedAudioExt = ["mp4"];

function TrackForm() {
  const [audioFile, setAudioFile] = useState();
  const [imageFile, setImageFile] = useState();

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    // validationSchema: {},
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      const { setSubmitting } = actions;
      const data = {
        title: values.title,
        released_date: values.released_date,
        genres: values.genres,
        url: [values.image],
      };

      // setSubmitting(true);
      // createTrack(data).finally(() => setSubmitting(false));
    },
  });

  const {
    values,
    errors,
    touched,
    isValid,
    isValidating,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldError,
  } = formik;

  console.log(values);

  return (
    <Container as="main">
      <MiddleTitle>Add new track</MiddleTitle>
      {/* {status === "done" && <Alert severity={success ? "success" : "error"}>{message}</Alert>}
      {status === "error" && <Alert variant="danger text-center">{error.message}</Alert>} */}
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 0, md: 2 },
          }}
        >
          <Box sx={{ flexGrow: 1, mb: 3 }}>
            <InputLabel sx={{ mb: 1 }} htmlFor="input_title">
              Track title
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              id="input_title"
              name="title"
              type="text"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.title && errors.title)}
              helperText={errors.title}
            />
          </Box>
          <Box sx={{ flexGrow: 1, mb: 3 }}>
            <InputLabel sx={{ mb: 1 }} htmlFor="input_released_date">
              Release date
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              id="input_released_date"
              name="released_date"
              type="date"
              value={values.released_date}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.released_date && errors.released_date)}
              helperText={errors.released_date}
            />
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, mb: 3 }}>
          <InputLabel sx={{ mb: 1 }} htmlFor="input_genres">
            Genre(s)
          </InputLabel>
          <Select
            fullWidth
            id="input_genres"
            name="genres"
            fullWidth
            multiple
            value={values.genres}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.genres && errors.genres)}
            input={<Input />}
          >
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 0, md: 2 },
          }}
        >
          <Box sx={{ mb: 3 }}>
            <InputLabel sx={{ mb: 1 }} htmlFor="input_track_cover">
              Cover image file
            </InputLabel>
            <FileUploader
              handleChange={(file) => {
                setImageFile(file);

                uploadResource(file, "image").then((res) => {
                  setFieldValue("url_image", res.data.url);
                });
              }}
              name="input_track_cover"
              types={allowedImageExt}
            />
          </Box>
          {values?.url_image && (
            <Box>
              <Typography sx={{ color: "rgba(0, 0, 0, 0.6)", mb: 1 }}>
                Cover image preview
              </Typography>
              <img style={{ width: "6rem", height: "6rem" }} src={values.url_image} alt="preview" />
            </Box>
          )}
        </Box>
        <Box sx={{ mb: 3 }}>
          <InputLabel sx={{ mb: 1 }} htmlFor="input_audio_file">
            Track file
          </InputLabel>
          <FileUploader
            handleChange={(file) => {
              setAudioFile(file);

              uploadResource(file, "video")
                .then((res) => {
                  setFieldValue("url_track", res.data);
                })
                .catch((err) => {
                  setFieldError(err.message);
                });
            }}
            name="input_audio_file"
            types={allowedAudioExt}
          />
        </Box>
        <LoadingButton
          disabled={!isValid}
          loading={isValidating || isSubmitting}
          variant="contained"
        >
          Add new track
        </LoadingButton>
      </form>
    </Container>
  );
}

export default withLayout(TrackForm);
