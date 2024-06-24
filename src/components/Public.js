import React, { useEffect, useState } from "react";

const Public = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch("https://jsonplaceholder.typicode.com/users");
      const response = await data.json();
      setUsers(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Listing user data {users.length}</h2>
      {users.length > 0 && (
        <table className="student-table">
          <thead className="student-heading">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item.id} className="student-body">
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Public;
