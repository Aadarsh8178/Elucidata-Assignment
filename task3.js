const converttoExcel = require("./convertJsontoExcel");
const xlsxtojson = require("xlsx-to-json");

const task3 = async () => {
  xlsxtojson(
    {
      input: "./output/rounded.xlsx",
      output: null,
      lowerCaseHeaders: true,
    },
    function (err, result) {
      if (err) {
        throw Error(err);
      }
      result = result.sort(
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
      const n = result.length;
      const headings = Object.keys(result[0]);
      for (var a = 0; a < n; a++) {
        const item = result[a];
        var s = a;
        while (
          a + 1 < n &&
          item["Retention Time Roundoff (in mins)"] ===
            result[a + 1]["Retention Time Roundoff (in mins)"]
        ) {
          a++;
          headings.forEach((header) => {
            if (!dontInclude.includes(header)) {
              item[header] = Number(item[header]) + Number(result[a][header]);
            }
          });
        }
        var len = a - s + 1;
        let resItem = {};
        resItem["Retention Time Roundoff (in mins)"] =
          item["Retention Time Roundoff (in mins)"];
        console.log(len);
        headings.forEach((header) => {
          if (!dontInclude.includes(header)) {
            resItem[header] = item[header] / len;
          }
        });
        groupedData.push(resItem);
      }
      converttoExcel(groupedData, "grouped.xlsx");
      return "grouped.xlsx";
    }
  );
};

module.exports = task3;
