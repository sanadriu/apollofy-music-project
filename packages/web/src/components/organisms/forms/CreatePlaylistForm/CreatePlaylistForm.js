import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useFormik } from "formik";

import validationSchema from "../../../../schemas/PlaylistSchema";
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
  Pagination,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { uploadResource } from "../../../../api/api-cloudinary";
import { useMyTracks } from "../../../../hooks/useTracks";
import { useSetPlaylist } from "../../../../hooks/usePlaylists";

function CreatePlaylistForm() {
  const [trackListPage, setTrackListPage] = useState(1);

  const initialValues = {
    title: "",
    description: "",
    color: "",
    url_image: "",
    tracks: [],
  };

  const allowedImageExt = ["jpg", "jpeg", "png"];

  const {
    isLoading: setPlaylistIsLoading,
    isError: setPlaylistIsError,
    isSuccess: setPlaylistIsSuccess,
    error: setPlaylistError,
    data: setPlaylistResponse,
    mutate,
  } = useSetPlaylist();

  const {
    isLoading: fetchMyTracksIsLoading,
    isError: fetchMyTracksIsError,
    isSuccess: fetchMyTracksIsSuccess,
    error: fetchMyTracksError,
    data: fetchMyTracksResponse,
  } = useMyTracks({ page: trackListPage });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const data = {
        title: values.title,
        description: values.description,
        url: values.url_playlist,
        color: values.color,
        tracks: values.tracks,
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
      <Typography sx={{ fontSize: "2rem", fontWeight: "light", mb: 2 }}>
        Create New Playlist
      </Typography>
      {setPlaylistIsSuccess && (
        <Alert sx={{ mb: 2 }} severity={setPlaylistResponse.data.success ? "success" : "error"}>
          {setPlaylistResponse.data.message}
        </Alert>
      )}
      {setPlaylistIsError && (
        <Alert sx={{ mb: 2 }} severity="error">
          {setPlaylistError.message}
        </Alert>
      )}

      {fetchMyTracksIsSuccess && (
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
                Playlist title
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
              <InputLabel sx={{ mb: 1 }} htmlFor="color">
                Playlist Color
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                id="color"
                name="color"
                type="text"
                value={values.color}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.color && errors.color)}
                helperText={errors.color}
              />
            </Box>
          </Box>
          <Box sx={{ flexGrow: 3, mb: 1 }}>
            <InputLabel sx={{ mb: 1 }} htmlFor="input_description">
              Description
            </InputLabel>
            <TextField
              fullWidth
              multilines
              size="large"
              id="input_description"
              name="description"
              type="text"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.description && errors.description)}
              helperText={errors.description}
            />
          </Box>
          <Box sx={{ flexGrow: 1, mb: 3 }}>
            <InputLabel sx={{ mb: 1 }} htmlFor="input_tracks">
              Track(s)
            </InputLabel>
            <Select
              fullWidth
              size="small"
              id="input_tracks"
              name="tracks"
              multiple
              value={values.tracks}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.tracks && errors.tracks)}
              input={<Input />}
            >
              {fetchMyTracksResponse.data.data.map((track) => (
                <MenuItem key={track.id} value={track.id}>
                  {track.title}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ mb: 3 }}>
            <InputLabel sx={{ mb: 1 }} htmlFor="input_Playlist_cover">
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
              name="input_Playlist_cover"
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
                  marginBottom: "1rem",
                  aspectRatio: "4/3",
                  objectFit: "contain",
                  objectPosition: "center",
                  borderRadius: "0.25rem",
                  boxShadow: "0 0 0.25rem rgba(0, 0, 0, 0.5)",
                }}
                src={values.url_image}
                alt="preview"
              />
              <Typography sx={{ color: "rgba(0, 0, 0, 0.6)", mb: 1 }}>Cover image URL</Typography>
              <Typography sx={{ fontSize: "0.9rem", mb: 3 }}>{values.url_image}</Typography>
            </Box>
          )}
          {/* {fetchMyTracksResponse?.data && (
          <DataGrid
            pageSize={fetchMyTracksResponse.data.pages}
            columns={[
              { field: "id", headerName: "ID", width: 70 },
              { field: "firstName", headerName: "First name", width: 130 },
              { field: "lastName", headerName: "Last name", width: 130 },
              {
                field: "age",
                headerName: "Age",
                type: "number",
                width: 90,
              },
              {
                field: "fullName",
                headerName: "Full name",
                description: "This column has a value getter and is not sortable.",
                sortable: false,
                width: 160,
                valueGetter: (params) =>
                  `${params.row.firstName || ""} ${params.row.lastName || ""}`,
              },
            ]}
            rows={fetchMyTracksResponse.data.data.map((track) => ({
              id: track.id,
              title: track.title,
              genres: track.genres.join(", "),
              duration: track.duration,
              released_date: track.released_date,
            }))}
          />
        )} */}
          <LoadingButton
            type="submit"
            disabled={!isValid}
            loading={isValidating || setPlaylistIsLoading}
            variant="contained"
          >
            Add Playlist
          </LoadingButton>
        </form>
      )}
    </Container>
  );
}

export default CreatePlaylistForm;
