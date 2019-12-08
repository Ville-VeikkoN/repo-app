export const getParsedDate = date => {
  date = String(date).split('T');
  var splittedDate = String(date[0]).split('-');
  return splittedDate[2] + '.' + splittedDate[1] + '.' + splittedDate[0];
};
