import { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($username: String!) {
    createUser(username: $username) {
      username
      balance
      totalWins
      totalLosses
    }
  }
`;

function App() {
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
  const [username, setUsername] = useState("lenny");

  const handleCreateUser = () => {
    createUser({ variables: { username } })
      .then((response) => {
        console.log("User created:", response.data);
        console.log("Joining the chat...");
        
        
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  // Testing the hookup with Express server
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch("http://localhost:4000/testApi");
  //     const data = await response.json();
  //     console.log("data from server:", data);
  //   }
  //   fetchData();
  // }, []);

  // Testing the hookup with websocket server
  useEffect(() => {
    async function connectToWs() {
      type Message = {
        type: string;
        room?: string;
        text?: string;
      };
      const ws = new WebSocket("ws://localhost:4000");
      ws.onopen = () => {
        console.log("connected to websocket");
        const message: Message = {
          type: "join",
        };
        ws.send(JSON.stringify(message));
      };
      ws.onmessage = (message) => {
        console.log("received message: ", message);
      };
    }
    connectToWs();
  }, []);

  return (
    <div className="App__title">
      <b>Create a new user</b>
      <div>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleCreateUser}>Create User</button>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleCreateUser}>Create User</button>
      </div>
    </div>
  );
}

export default App;
