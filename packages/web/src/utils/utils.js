export const formatDuration = (duration) => {
  const durMins = Math.floor((duration % 3600) / 60);
  const durSecs = Math.floor((duration % 3600) % 60);
  return `${durMins}:${durSecs}`;
};

export const makePrefix = (prefix) => {
  return function getTestId(dataTestId) {
    return `${prefix}-${dataTestId}`;
  };
};

export const validateName = (value) => {
  const nameRegex = RegExp(/^[a-zA-z\d_-]+$/i);
  return nameRegex.test(value) ? "" : "Invalid name!";
};

