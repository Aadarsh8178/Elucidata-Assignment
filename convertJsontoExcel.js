const xlsx = require("xlsx");

const converter = (files, filename) => {
  var newWB = xlsx.utils.book_new();
  var newWS = xlsx.utils.json_to_sheet(files);
  xlsx.utils.book_append_sheet(newWB, newWS, "name");
  xlsx.writeFile(newWB, `./output/${filename}`);
};

module.exports = converter;
