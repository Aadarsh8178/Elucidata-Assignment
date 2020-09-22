import React, { useState, useEffect } from "react";
import axios from "axios";
import FileUpload from "./components/FileUpload";
import Spinner from "./components/Spinner";

function App() {
  const [firstTask, setFirstTask] = useState(false);
  const [secondTask, setSecondTask] = useState(false);
  const [thirdTask, setThirdTask] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/cleandata");
  }, []);
  const errorModal = (err) => {
    setLoading(false);
    alert(err);
  };
  const task1 = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/task1");
      console.log(res);
      setLoading(false);
      setFirstTask(true);
    } catch (e) {
      errorModal(e.response.data.err_desc);
    }
  };
  const task2 = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/task2");
      console.log(res);
      setSecondTask(true);
      setLoading(false);
    } catch (e) {
      errorModal(e.response.data.err_desc);
    }
  };
  const task3 = async () => {
    try {
      setLoading(true);
      await axios.get("http://localhost:8000/task3");
      setThirdTask(true);
      setLoading(false);
    } catch (e) {
      errorModal(e.response.data.err_desc);
    }
  };
  const download = async (file) => {
    try {
      const response = await axios.get(`http://localhost:8000/download`, {
        params: {
          filename: file,
        },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div
      className="bg-light d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      {loading && <Spinner />}
      <div className="w-50 d-flex flex-column align-items-center justify-content-center">
        <FileUpload setLoading={setLoading} />
        <div className="">
          {firstTask ? (
            <div className="d-flex">
              <button
                onClick={() => download("pcFile")}
                className="m-2 btn btn-info"
              >
                Download pc file
              </button>
              <button
                onClick={() => download("lpcFile")}
                className="m-2 btn btn-info"
              >
                Download lpc file
              </button>
              <button
                onClick={() => download("plasmalogenFile")}
                className="m-2 btn btn-info"
              >
                Download plasmalogen file
              </button>
            </div>
          ) : (
            <button
              type="button"
              class="m-2 btn btn-secondary btn-lg btn-block"
              onClick={task1}
            >
              Separate file in lp,lpc and plasmalogen
            </button>
          )}
          {secondTask ? (
            <button
              type="button"
              class="m-2 btn btn-info btn-lg btn-block"
              onClick={() => download("rounded")}
            >
              Download Retention time round off file
            </button>
          ) : (
            <button
              type="button"
              class="m-2 btn btn-secondary btn-lg btn-block"
              onClick={task2}
            >
              Retention time round off
            </button>
          )}
          {thirdTask ? (
            <button
              type="button"
              class="m-2 btn btn-info btn-lg btn-block"
              onClick={() => download("grouped")}
            >
              Download Group by Retention time round off file
            </button>
          ) : (
            <button
              type="button"
              class="m-2 btn btn-secondary btn-lg btn-block"
              onClick={task3}
            >
              Group by Retention time round off
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
