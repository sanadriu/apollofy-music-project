const media = {
  smallMobile: "476px",
  mobile: "576px",
  phablet: "767px",
  tablet: "992px",
  desktop: "1200px",
  bigDesktop: "1450px",
};

export const lightTheme = {
  colors: {
    label: "#B04AFF",
    body: "#FFF",
    text: "#363537",
    toggleBorder: "#FFF",
    background: {
      primary: "#FFF",
      secondary: "#9000ff21",
      secondary_hover: "#E7E7E7",
      gradient: "rgb(168 141 215 / 70%), rgb(0 167 239 / 63%)",
    },
    border: "lightgray",
  },
  media: media,
  fonts: {
    primary:
      "Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif",
  },
};
export const darkTheme = {
  colors: {
    label: "#B04AFF",
    body: "black",
    text: "#FAFAFA",
    toggleBorder: "#6B8096",
    background: {
      primary: "black",
      secondary: "#0E0E0E",
      secondary_hover: "#3a3a3a",
      gradient: "#4847475c,rgb(38 38 38 / 67%)",
    },
    border: "#3a3a3a",
  },
  media: media,
  fonts: {
    primary:
      "Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif",
  },
};
