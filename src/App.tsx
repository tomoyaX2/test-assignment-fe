import { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get(`api/links`);
  }, []);

  return (
    <div className="">
      <h1 className="">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count} + 1
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
