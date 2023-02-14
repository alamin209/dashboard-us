export const formatDate = (date) => {
  const d = new Date(date);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatOptions = (data) => {
  return data.map((item) => {
    return {
      label: item.name,
      value: item._id,
    };
  });
};

export const isValidEmail = (email) => {
  return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
};

export const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const isDate = (date) => {
  const dateString = date.toString();
  return dateString.match(/^\d{2}\/\d{2}\/\d{4}$/);
};

export const capitalize = (str) => {
  return str
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};
