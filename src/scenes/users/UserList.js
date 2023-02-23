import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bulma/css/bulma.css";
import { reactLocalStorage } from "reactjs-localstorage";

const UserList = () => {
  const [users, setUser] = useState([]);
  const [email, setEmail] = useState([])

  useEffect(() => {
    setEmail(reactLocalStorage.getObject('user').email);
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5001/listUsers");
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.post(`http://localhost:5001/deleteUsers`,{
        id
      });
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const testInnerJoin = async () =>{
    try {
      const response = await axios.post(`http://localhost:5000/testInnerJoin`, {
        email,
      });
      console.log('response --> ', response.data[0])
    } catch (error) {
      console.log(error);
    }
  };

  const testInnerJoin2 = async () =>{
    console.log('trying');
    try {
      const response = await axios.get("http://localhost:5001/getAccounts");
      console.log('response --> ', response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
      <button
                    onClick={() => testInnerJoin()}
                    className="button is-small is-danger"
                  >
                    testInnerJoin
      </button>
      <button
                    onClick={() => testInnerJoin2()}
                    className="button is-small is-danger"
                  >
                    testInnerJoin2
      </button>
        <Link to={`/add`} className="button is-success">
          View
        </Link>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>
                  <Link
                    to={`/edit/${user.id}`}
                    className="button is-small is-info mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
