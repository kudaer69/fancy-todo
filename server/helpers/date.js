const dateValidation = () => {
  let temp = new Date();
  return `${temp.getMonth()}-${temp.getDate()}-${temp.getFullYear()}`;
};

module.exports = {
  dateValidation
}