import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AiFillDelete,
  AiOutlineEdit,
  AiOutlineCloseSquare,
} from "react-icons/ai";
import "./App.css";

const App = () => {
  const baseUrl = "https://reqres.in/api/users";
  const [userList, setUserList] = useState([]);
  const [email, setEmail] = useState("");
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editEmail, setEditEmail] = useState("");
  const [editFname, setEditFname] = useState("");
  const [editLname, setEditLname] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [id, setId] = useState(null);
  // const [editUser, setEditUser] = useState("");

  useEffect(() => {
    axios.get(`${baseUrl}`).then((response) => {
      setUserList(response.data.data);
    });
  }, [baseUrl]);

  // console.log(userList);

  const createUser = async (e) => {
    e.preventDefault();
    if (!email || !first_name || !last_name || !avatar) {
      alert("Need to enter enough information");
      return;
    }
    const postData = {
      id: userList.length + 1,
      email,
      first_name,
      last_name,
      avatar,
    };
    await axios.post(baseUrl, postData).then((result) => {
      setUserList([...userList, result.data]);
      // console.log(userList);
      // console.log(result.data.id);
    });
  };

  const togglePopup = (user) => {
    setIsOpen(!isOpen);
    console.log(user);
    setEditFname(user.first_name);
    setEditLname(user.last_name);
    setEditEmail(user.email);
    setEditAvatar(user.avatar);
    setId(user.id);
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      id,
      first_name: editFname,
      last_name: editLname,
      email: editEmail,
      avatar: editAvatar,
    };
    try {
      const response = await axios.put(`${baseUrl}/${id}`, updatedUser);
      console.log(response);
      setUserList(
        userList.map((item) => (item.id === id ? { ...response.data } : item))
      );
      setEditFname(editFname);
      setEditLname(editLname);
      setEditEmail(editEmail);
      setEditAvatar(editAvatar);
      setIsOpen(!isOpen);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(baseUrl, `/${id}`);
      const userChange = userList.filter((user) => user.id !== id);
      setUserList(userChange);
      console.log(userChange);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <div className="App">
      <div className="userList">
        {userList?.map((user) => {
          const { id, email, first_name, last_name, avatar } = user;
          return (
            <div className="user" key={id}>
              <div>
                <img src={avatar} alt="" />
              </div>
              <div className="info">
                <h2>
                  {first_name} {last_name}
                </h2>
                <p>{email}</p>
              </div>
              <div className="icons">
                <button className="btn" onClick={() => deleteData(id)}>
                  <AiFillDelete />
                </button>
                <button className="btn" onClick={() => togglePopup(user)}>
                  <AiOutlineEdit />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {isOpen && (
        <div className="popup-box">
          <div className="box">
            <form className="userForm" onSubmit={(e) => handleEdit(e)}>
              <div className="form-title">
                <h2>Edit the user</h2>
                <button className="close" onClick={togglePopup}>
                  <AiOutlineCloseSquare />
                </button>
              </div>
              <div className="form-text">
                <label htmlFor="fname">First Name</label>
                <input
                  type="text"
                  id="editfname"
                  name="editfname"
                  value={editFname}
                  onChange={(e) => setEditFname(e.target.value)}
                />
              </div>
              <div className="form-text">
                <label htmlFor="lname">Last Name</label>
                <input
                  type="text"
                  id="editlname"
                  name="editlname"
                  value={editLname}
                  onChange={(e) => setEditLname(e.target.value)}
                />
              </div>
              <div className="form-text">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="editemail"
                  name="editemail"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
              </div>
              <div className="form-text">
                <label htmlFor="avatar">Avatar URL</label>
                <input
                  type="text"
                  id="editavatar"
                  name="editavatar"
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                />
              </div>
              <button className="btn">Update</button>
            </form>
          </div>
        </div>
      )}

      <div className="addUser">
        <form className="userForm" onSubmit={createUser}>
          <h2>Add User</h2>
          <div className="form-text">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={first_name}
              onChange={(e) => setFirst_Name(e.target.value)}
            />
          </div>
          <div className="form-text">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              id="lname"
              name="lname"
              value={last_name}
              onChange={(e) => setLast_Name(e.target.value)}
            />
          </div>
          <div className="form-text">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-text">
            <label htmlFor="avatar">Avatar URL</label>
            <input
              type="text"
              id="avatar"
              name="avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
          <button className="btn">Add</button>
        </form>
      </div>
    </div>
  );
};

export default App;
