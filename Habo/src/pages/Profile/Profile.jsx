import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Profile.scss";
import Avatar from "../../assets/images/AvatarImageIhab.jpg";

const activities = [
  { time: '2024-06-19', text: 'Logged in' },
  { time: '2024-06-18', text: 'Updated profile' },
  { time: '2024-06-17', text: 'Changed password' },
];

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    address: '',
    userRole: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3001/api/auth/userInfo/24') // Assuming the user ID is 24
      .then(response => {
        setUserInfo(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          address: response.data.address,
        });
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    axios.post('http://localhost:3001/api/auth/updateUserInfo', { id: 24, ...formData })
      .then(response => {
        if (response.data.Status === "Success") {
          setUserInfo(formData);
          setEditMode(false);
        } else {
          console.error('Error updating user info:', response.data.Error);
        }
      })
      .catch(error => {
        console.error('Error updating user info:', error);
      });
  };

  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <img src={Avatar} alt="Profile" />
            {userInfo && <h1>{userInfo.username}</h1>}
            <button className='buttonUp' onClick={() => setEditMode(true)}>Update</button>
          </div>
          <div className="details">
            {userInfo && Object.entries(userInfo).map(([key, value]) => (
              <div className="item" key={key}>
                <span className="itemTitle">{key}</span>
                <span className="itemValue">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className="chart">
          {/* The chart can be added here */}
        </div>
      </div>
      <div className="activities">
        <h2>Latest Activities</h2>
        <ul>
          {activities.map((activity) => (
            <li key={activity.text}>
              <div>
                <p>{activity.text}</p>
                <time>{activity.time}</time>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {editMode && (
        <div className="modal">
          <div className="modalContent">
            <h2>Edit Profile</h2>
            <label>
              Username:
              <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </label>
            <label>
              Address:
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
            </label>
            <label>
              User Role:
              <input type="text" name="userRole" value={formData.userRole} onChange={handleInputChange} />
            </label>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
