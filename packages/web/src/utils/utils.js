export const formatDuration = (duration) => {
  const durMins = Math.floor((duration % 3600) / 60);
  const durSecs = Math.floor((duration % 3600) % 60);
  return `${durMins}:${durSecs}`;
};

