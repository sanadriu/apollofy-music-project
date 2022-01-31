import * as yup from "yup";
import moment from 'moment';

const DateOfBirthSchema = yup.object().shape({
  date: yup
    .date()
    .required("Date of birth is Required")
    .test(
      "DOB",
      "Please choose a valid date of birth",
      (date) => moment().diff(moment(date), "years") >= 3
    )
});

export default DateOfBirthSchema;
