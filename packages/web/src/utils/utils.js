export const formatNumReprod = (num) => {
  let convertNum = num;

  if (Math.abs(Number(num)) >= 1.0e9) {
    convertNum = (Math.abs(Number(num)) / 1.0e9).toFixed(2) + "B";
  } else if (Math.abs(Number(num)) >= 1.0e6) {
    convertNum = (Math.abs(Number(num)) / 1.0e6).toFixed(2) + "M";
  } else if (Math.abs(Number(num)) >= 1.0e3) {
    convertNum = (Math.abs(Number(num)) / 1.0e3).toFixed(2) + "K";
  }

  return convertNum;
};
