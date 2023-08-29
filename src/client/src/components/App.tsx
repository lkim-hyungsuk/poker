import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({
    message: "Loading...",
  });

  // Testing the hookup with Express server
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:4000/testApi");
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, []);

  // Testing the hookup with websocket server
  useEffect(() => {
    async function connectToWs() {
      const ws = new WebSocket("ws://localhost:4000");
      ws.onopen = () => {
        console.log("connected to websocket");
        ws.send("hello from client");
      };
      ws.onmessage = (message) => {
        console.log("received message: ", message);
      };
    }
    connectToWs();
  }, []);

  return (
    <div className="App__title">
      Here is the fetched data: <b>{data?.message}</b>
    </div>
  );
}

export default App;
