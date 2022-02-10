import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";

import { Button, Box } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Stack from "@mui/material/Stack";

import FlexColumn from "../../../atoms/FlexColumn";
import MiddleTitle from "../../../atoms/MiddleTitle";

import DateOfBirthSchema from "../../../../schemas/DateOfBirthSchema";

// import { setDateOfBirth } from '../../../../redux/auth';
import { modalSelector, nextModal } from "../../../../redux/modal";

const dateSchema = {
  date: null, // if date is defiend as '' yup will throw a invalid date error
};

export default function BirthDayForm() {
  const dispatch = useDispatch();
  const { currentModal } = useSelector(modalSelector);

  return (
    <Formik
      initialValues={dateSchema}
      validationSchema={DateOfBirthSchema}
      onSubmit={values => {
        // console.log(values);
        // if (values.date) dispatch(setDateOfBirth(values.date));

        dispatch(nextModal(currentModal + 1));
      }}
      render={(props) => (
        <Form>
          <FlexColumn>
            <MiddleTitle>Create your account</MiddleTitle>
            <Box width="100%" mb={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  {isMobile ? (
                    <MobileDatePicker
                      label="Select a date"
                      value={props.values.date}
                      onChange={(value) => props.setFieldValue("date", value)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  ) : (
                    <DesktopDatePicker
                      label="Select a date"
                      value={props.values.date}
                      minDate={new Date("2017-01-01")}
                      onChange={(value) => props.setFieldValue("date", value)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  )}
                </Stack>
              </LocalizationProvider>
              <ErrorMessage className="errorMessage" name="date" component="div" />
            </Box>
            <Box width="100%" my={2}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </FlexColumn>
        </Form>
      )}
    />
  );
}

BirthDayForm.propTypes = {
  values: PropTypes.element,
  setFieldValue: PropTypes.object,
};

BirthDayForm.defaultProps = {
  values: null,
  setFieldValue: {},
};
