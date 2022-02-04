import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchTrack, useUpdateTrack } from "../../../../hooks/useTracks";
import { useGenres } from "../../../../hooks/useGenres";
import validationSchema from "../../../../schemas/TrackSchema";
import {
  Box,
  Alert,
  AlertTitle,
  Input,
  InputLabel,
  Select,
  TextField,
  Container,
  MenuItem,
  Typography,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { uploadResource } from "../../../../api/api-cloudinary";
import { MiddleTitle } from "../../../atoms/MiddleTitle/MiddleTitle";
import withLayout from "../../../hoc/withLayout";

const initialValues = function (responseData = {}) {
  return {
    title: responseData.title,
    released_date: responseData.released_date,
    genres: responseData.released_date,
    url_track: responseData.url,
    url_image: responseData.thumbnails.url,
    duration: responseData.duration,
  };
};

const allowedImageExt = ["jpg", "jpeg", "png"];
const allowedAudioExt = ["mp4"];

function TrackUpdateForm() {
  const { id } = useParams();

  const {
    isLoading: updateTrackIsLoading,
    isError: updateTrackIsError,
    isSuccess: updateTrackIsSuccess,
    error: updateTrackError,
    data: updateTrackResponse,
    mutate,
  } = useUpdateTrack();

  const {
    isLoading: fetchTrackIsLoading,
    isError: fetchTrackIsError,
    isSuccess: fetchTrackIsSuccess,
    data: fetchTrackResponse,
  } = useFetchTrack(id);

  const {
    isLoading: fetchGenresIsLoading,
    isError: fetchGenresIsError,
    isSuccess: fetchGenresIsSuccess,
    data: fetchGenresResponse,
  } = useGenres();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues(fetchTrackResponse?.data?.data),
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const data = {
        title: values.title,
        released_date: values.released_date,
        genres: values.genres,
        url: values.url_track,
        duration: values.duration,
        thumbnails: {
          url_default: values.url_image,
        },
      };

      mutate(data);
    },
  });

  const {
    values,
    errors,
    touched,
    isValid,
    isValidating,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldError,
  } = formik;

  return (
    <Container as="main">
      <MiddleTitle>Add new track</MiddleTitle>
      {updateTrackIsSuccess && (
        <Alert sx={{ mb: 2 }} severity={updateTrackResponse.data.success ? "success" : "error"}>
          {updateTrackResponse.data.message}
        </Alert>
      )}
      {updateTrackIsError && (
        <Alert sx={{ mb: 2 }} severity="error">
          {updateTrackError.message}
        </Alert>
      )}
      {fetchGenresIsError ||
        (fetchTrackIsError && (
          <Alert sx={{ mb: 2 }} severity="error" variant="filled">
            <AlertTitle>Network error</AlertTitle>
            Site is unable to reach the server
          </Alert>
        ))}
      {fetchGenresIsLoading ||
        (fetchTrackIsLoading && (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: "4rem" }}>
            <CircularProgress size={128} />
          </Box>
        ))}
      {fetchGenresIsSuccess ||
        (fetchTrackIsSuccess && (
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
                {fetchGenresResponse.data.data.map((genre) => (
                  <MenuItem key={genre.name} value={genre.name}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ mb: 3 }}>
              <InputLabel sx={{ mb: 1 }} htmlFor="input_track_cover">
                Cover image file
              </InputLabel>
              <FileUploader
                handleChange={(file) => {
                  uploadResource(file, "image")
                    .then((res) => {
                      setFieldValue("url_image", res.data.url);
                    })
                    .catch((err) => {
                      setFieldError("url_image", err.message);
                    });
                }}
                name="input_track_cover"
                types={allowedImageExt}
              />
              {touched.url_image && errors.url_image && (
                <FormHelperText style={{ color: "#d32f2f" }}>{errors.url_image}</FormHelperText>
              )}
            </Box>
            {values?.url_image && (
              <Box>
                <Typography sx={{ color: "rgba(0, 0, 0, 0.6)", mb: 1 }}>
                  Cover image preview
                </Typography>
                <img
                  style={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "contain",
                    padding: "0.25rem",
                    borderRadius: "0.25rem",
                    boxShadow: "0 0 0.25rem rgba(0, 0, 0, 0.5)",
                  }}
                  src={values.url_image}
                  alt="preview"
                />
              </Box>
            )}
            <Box sx={{ mb: 3 }}>
              <InputLabel sx={{ mb: 1 }} htmlFor="input_audio_file">
                Track file
              </InputLabel>
              <FileUploader
                handleChange={(file) => {
                  uploadResource(file, "video")
                    .then((res) => {
                      setFieldValue("url_track", res.data.url);
                      setFieldValue("duration", res.data.duration);
                    })
                    .catch((err) => {
                      setFieldError("url_track", err.message);
                    });
                }}
                name="input_audio_file"
                types={allowedAudioExt}
              />
              {touched.url_track && errors.url_track && (
                <FormHelperText style={{ color: "#d32f2f" }}>{errors.url_track}</FormHelperText>
              )}
            </Box>
            <LoadingButton
              type="submit"
              disabled={!isValid}
              loading={isValidating || updateTrackIsLoading}
              variant="contained"
            >
              Add new track
            </LoadingButton>
          </form>
        ))}
    </Container>
  );
}

export default withLayout(TrackUpdateForm);
