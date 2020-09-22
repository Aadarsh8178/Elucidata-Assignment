var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var multer = require("multer");
var fs = require("fs").promises;
var path = require("path");
// var fs = require("fs");
var task1 = require("./task1");
var task2 = require("./task2");
var task3 = require("./task3");
var xlsxtojson = require("xlsx-to-json");
var data = require("./data.json");
app.use(cors());
app.use(bodyParser.json());
var storage = multer.diskStorage({
  //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(
      null,
      file.fieldname +
        "-" +
        datetimestamp +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

var upload = multer({
  //multer settings
  storage: storage,
  fileFilter: function (req, file, callback) {
    //file filter
    if (
      ["xlsx"].indexOf(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      ) === -1
    ) {
      return callback(new Error("Wrong extension type"));
    }
    callback(null, true);
  },
}).single("file");

/** API path that will upload the files */
app.post("/upload", function (req, res) {
  var exceltojson;
  upload(req, res, function (err) {
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }
    /** Multer gives us file info in req.file object */
    if (!req.file) {
      res.json({ error_code: 1, err_desc: "No file passed" });
      return;
    }

    try {
      xlsxtojson(
        {
          input: req.file.path,
          output: "data.json", //since we don't need output.json
          lowerCaseHeaders: true,
        },
        function (err, result) {
          if (err) {
            return res.json({ error_code: 1, err_desc: err, data: null });
          }
          res.json({ error_code: 0, err_desc: null });
        }
      );
    } catch (e) {
      res.json({ error_code: 1, err_desc: "Corupted excel file" });
    }
  });
});
app.get("/task1", async (req, res) => {
  try {
    await task1();
    res
      .status(200)
      .json({ error_code: 0, err_desc: null, data: "file created" });
  } catch (e) {
    console.log(e);
    res.status(412).json({ error_code: 2, err_desc: "Data not available" });
  }
});
app.get("/task2", async (req, res) => {
  try {
    await task2();
    console.log("created");
    res
      .status(200)
      .json({ error_code: 0, err_desc: null, data: "file created" });
  } catch (e) {
    console.log(e);
    res.status(412).json({ error_code: 2, err_desc: "Data not available" });
  }
});
app.get("/task3", async (req, res) => {
  try {
    await task3();
    res
      .status(200)
      .json({ error_code: 0, err_desc: null, data: "file created" });
  } catch (e) {
    console.log(e);
    res.status(412).json({ error_code: 2, err_desc: "Data not available" });
  }
});
app.get("/download", function (req, res) {
  const filename = req.query.filename;
  if (filename === "pcFile") {
    const file = `${__dirname}/output/pc.xlsx`;
    return res.download(file);
  }
  if (filename === "lpcFile") {
    const file = `${__dirname}/output/lpc.xlsx`;
    return res.download(file);
  }
  if (filename === "plasmalogenFile") {
    const file = `${__dirname}/output/plasmalogen.xlsx`;
    return res.download(file);
  }
  if (filename === "rounded") {
    const file = `${__dirname}/output/rounded.xlsx`;
    return res.download(file);
  }
  if (filename === "grouped") {
    const file = `${__dirname}/output/grouped.xlsx`;
    return res.download(file);
  }
  res.status(404).send();
});
app.get("/cleandata", async (req, res) => {
  try {
    await fs.writeFile("data.json", "[]");
    let directory = `${__dirname}/output/`;
    let files = await fs.readdir(directory);
    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
    directory = `${__dirname}/uploads/`;
    files = await fs.readdir(directory);
    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
    return res
      .status(200)
      .json({ error_code: 0, err_desc: null, data: "data cleared" });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error_code: 2, err_desc: "Unable to clear try again" });
  }
});
app.listen("8000", function () {
  console.log("running on 8000...");
});
