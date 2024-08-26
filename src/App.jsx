import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {
  const [work, setWork] = useState("");
  const [list, setList] = useState([]);
  const addToList = () => {
    setList([...list, work]);
    setWork("");
  };
  return (
    <>
      <div className="container ">
        <div className="d-flex align-items-center flex-column">
          <h1 className="text-primary mt-5">Hello, Bootstrap in React!</h1>
          <div className="input-group mb-3 w-50">
            <input
              aria-describedby="button-addon2"
              aria-label="Recipient's username"
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
              Button
            </button>
          </div>
          <h2>
            {list.map((work, index) => (
              <p key={index}>{work}</p>
            ))}
          </h2>
        </div>
      </div>
    </>
  );
}

export default App;
