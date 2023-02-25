import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bulma/css/bulma.css";
import { reactLocalStorage } from "reactjs-localstorage";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

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



  return (
    <Box m="20px" className = "chatbotBox">
    <Header title="Table" subtitle="Delete user" />
    <Link to={`/add`} className="button is-success">
          Add
        </Link>
    <div className="columns mt-5 is-centered">
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
                      to = {`/edit/${user.id}`}
                      state= {{
                        username: user.name,
                        useremail: user.email,
                        usergender: user.gender
                      }
                      }
                    
                    className="button is-small is-info mr-2"
                    >Edit</Link>
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
    </Box>
  );
};

export default UserList;
