import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Alert, Box, InputLabel, Input, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import withLayout from "../../../hoc/withLayout";

function uploadResource(files, type) {
  const formData = new FormData();

  formData.append("file", files[0]);
  formData.append("upload_preset", "crm5jzoc");

  return axios.post(`https://api.cloudinary.com/v1_1/stringifiers/${type}/upload`, formData);
}

const initialValues = {
  title: "",
  released_date: "",
  genres: [],
};

function TrackForm() {
  const [audioFiles, setAudioFiles] = useState();
  const [imageFiles, setImageFiles] = useState();

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema: {},
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      const { setSubmitting } = actions;
      const data = {
        title: values.title,
        description: values.description,
        price: values.price,
        stock: values.stock,
        images: [values.image],
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
  } = formik;

  return (
    <Container as="main">
      <MiddleTitle>Add new track</MiddleTitle>
      {/* {status === "done" && <Alert severity={success ? "success" : "error"}>{message}</Alert>}
      {status === "error" && <Alert variant="danger text-center">{error.message}</Alert>} */}
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <InputLabel htmlFor="input_title">Track title</InputLabel>
          <TextField
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
        <Box sx={{ mb: 3 }}>
          <InputLabel htmlFor="input_released_date">Release date</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={values.released_date}
              onChange={handleChange}
              renderInput={
                <TextField
                  id="input_released_date"
                  name="released_date"
                  value={values.released_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.released_date && errors.released_date)}
                  helperText={errors.released_date}
                />
              }
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ mb: 3 }}>
          <InputLabel htmlFor="input_track_cover">Cover image file</InputLabel>
          <Input
            type="file"
            accept="image/*"
            id="input_track_cover"
            onChange={(e) => {
              setImageFiles(e.target.files);
            }}
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <InputLabel htmlFor="input_audio_file">Track file</InputLabel>
          <Input
            type="file"
            accept="audio/*"
            id="input_track_cover"
            onChange={(e) => {
              setAudioFiles(e.target.files);
            }}
          />
        </Box>
        <LoadingButton
          disabled={!isValid}
          loading={isValidating || isSubmitting}
          loadingPosition="start"
          variant="contained"
        >
          Add new track
        </LoadingButton>
      </form>
    </Container>
  );
}

export default withLayout(TrackForm);
