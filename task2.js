const converttoExcel = require("./convertJsontoExcel");

const task2 = () => {
  const data = require("./data.json");
  if (data.length == 0) {
    throw Error("No data Available");
  }

  const headings = Object.keys(data[0]);
  let roundedData = [];
  data.forEach((item) => {
    if (item[headings[2]]) {
      const newItem = item;
      newItem["Retention Time Roundoff (in mins)"] = Math.round(
        newItem[headings[2]]
      );
      roundedData.push(newItem);
    }
  });
  converttoExcel(roundedData, "rounded.xlsx");
  return "rounded.xlsx";
};

module.exports = task2;
