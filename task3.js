const converttoExcel = require("./convertJsontoExcel");
const converttoJson = require("./converttojson");
const task3 = async () => {
  converttoJson("./uploads/inputFile.xlsx", null, (data) => {
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
    roundedData = roundedData.sort(
      (a, b) =>
        a["Retention Time Roundoff (in mins)"] -
        b["Retention Time Roundoff (in mins)"]
    );
    const dontInclude = [
      "m/z",
      "Retention time (min)",
      "Accepted Compound ID",
      "Retention Time Roundoff (in mins)",
    ];
    const groupedData = [];
    const n = roundedData.length;
    for (var a = 0; a < n; a++) {
      const item = roundedData[a];
      var s = a;
      while (
        a + 1 < n &&
        item["Retention Time Roundoff (in mins)"] ===
          roundedData[a + 1]["Retention Time Roundoff (in mins)"]
      ) {
        a++;
        headings.forEach((header) => {
          if (!dontInclude.includes(header)) {
            item[header] =
              Number(item[header]) + Number(roundedData[a][header]);
          }
        });
      }
      var len = a - s + 1;
      let resItem = {};
      resItem["Retention Time Roundoff (in mins)"] =
        item["Retention Time Roundoff (in mins)"];

      headings.forEach((header) => {
        if (!dontInclude.includes(header)) {
          resItem[header] = item[header] / len;
        }
      });
      groupedData.push(resItem);
    }
    converttoExcel(groupedData, "grouped.xlsx");
    return "grouped.xlsx";
  });
};

module.exports = task3;
