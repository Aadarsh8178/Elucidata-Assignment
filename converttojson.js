const xlsxtojson = require("xlsx-to-json");

const converter = (inputPath, outputPath, cb) => {
  return xlsxtojson(
    {
      input: inputPath,
      output: outputPath,
      lowerCaseHeaders: true,
    },
    function (err, result) {
      if (err) {
        throw Error(err);
      }
      cb(result);
    }
  );
};

module.exports = converter;
