import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({
    message: "Loading...",
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:4000/testApi");
      const data = await response.json();
      setData(data);
      console.log("From React, data: ", data);
    }
    fetchData();
  }, []);

  return (
    <div className="App__title">Here is the fetched data: {data?.message}</div>
  );
}

export default App;
