const converttoExcel = require("./convertJsontoExcel");
const converttojson = require("./converttojson");

const task1 = async () => {
  converttojson("./uploads/inputFile.xlsx", null, (data) => {
    let pcFiles = [];
    let lpcFiles = [];
    let plasmalogenFiles = [];
    const headings = Object.keys(data[0]);
    data.forEach((item) => {
      if (item[headings[3]].toLowerCase().endsWith("lpc")) {
        pcFiles.push(item);
      } else if (item[headings[3]].toLowerCase().endsWith("pc")) {
        lpcFiles.push(item);
      } else if (item[headings[3]].toLowerCase().endsWith("plasmalogen")) {
        plasmalogenFiles.push(item);
      }
    });
    const files = ["lpc.xlsx", "pc.xlsx", "plasmalogen.xlsx"];
    converttoExcel(pcFiles, files[0]);
    converttoExcel(lpcFiles, files[1]);
    converttoExcel(plasmalogenFiles, files[2]);
    return files;
  });
};

module.exports = task1;
