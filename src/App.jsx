import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [work, setWork] = useState("");
  const [list, setList] = useState([]);
  const addToList = () => {
    if (list.some((item) => item.id === work.replace(/\s/g, ""))) {
      toast.warn("Công việc đã được thêm vào!");
    } else {
      setList([...list, { id: work.replace(/\s/g, ""), job: work }]);
      setWork("");
    }
  };
  const deleteHandle = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="container ">
        <div className="d-flex align-items-center flex-column">
          <h1 className="text-primary mt-5">Hello, Bootstrap in React!</h1>
          <div className="input-group mb-3 w-50">
            <input
              className="form-control"
              value={work}
              onChange={(e) => setWork(e.target.value)}
              type="text"
            />
            <button
              className="btn btn-outline-secondary"
              id="button-addon2"
              type="button"
              onClick={addToList}
            >
              Thêm
            </button>
          </div>
          <h2>
            {list?.map((item) => (
              <div key={item.id}>
                <span>{item.job}</span>
                <span
                  onClick={() => deleteHandle(item.id)}
                  className="ms-auto"
                  style={{ cursor: "pointer" }}
                >
                  <i className="fa-solid fa-trash  "></i>
                </span>
              </div>
            ))}
          </h2>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </>
  );
}

export default App;
