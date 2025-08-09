import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/api/users/all`);
        setUsers(res.data); // ✅ make sure to use res.data
      } catch (err) {
        console.error(err);
        setError("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username || "No Name"} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
