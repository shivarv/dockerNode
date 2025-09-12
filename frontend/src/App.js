import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message));

    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>{message}</h1>
      <h2>Users:</h2>
      <ul>
        {users.map(u => <li key={u._id}>{u.name}</li>)}
      </ul>
      <DoctorList />
    </div>
  );
}

export default App;
