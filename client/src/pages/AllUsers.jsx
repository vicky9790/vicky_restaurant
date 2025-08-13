import React, { useEffect, useState } from "react";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/api/users/all`)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="all-users-container">
      <h2>All Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            {users[0]?.created_at && <th>Created At</th>}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {user.created_at && (
                  <td>{new Date(user.created_at).toLocaleString()}</td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
