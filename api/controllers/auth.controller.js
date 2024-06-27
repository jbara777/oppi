import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mysql from "mysql";
import nodemailer from "nodemailer";

const saltRounds = 10;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ihabahmad123-",
    database: "senior1",
});

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
      // Check if user already exists
      const checkUserSql = "SELECT * FROM user WHERE username = ?";
      db.query(checkUserSql, [username], async (err, userResult) => {
          if (err) return res.json({ Error: "Error checking for existing user in the server" });
          if (userResult.length > 0) return res.json({ Error: "User already exists" });

          // Insert into Employee table and get the employeeID
          const insertEmployeeSql = "INSERT INTO employee (email) VALUES (?)";
          db.query(insertEmployeeSql, [email], (err, employeeResult) => {
              if (err) return res.json({ Error: "Inserting employee data error in the server" });

              const employeeID = employeeResult.insertId;

              // Hash the password and insert into User table
              bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
                  if (err) return res.json({ Error: "Hashing password failed" });

                  const insertUserSql = "INSERT INTO user (`username`, `password`, `employeeID`, `isFirstLogin`, `createdOn`, `updatedOn`) VALUES (?)";
                  const values = [username, hashedPassword, employeeID, true, new Date(), new Date()];

                  db.query(insertUserSql, [values], (err, result) => {
                      if (err) return res.json({ Error: "Inserting user data error in the server" });
                      return res.json({ Status: "Success" });
                  });
              });
          });
      });
  } catch (err) {
      return res.json({ Error: "An error occurred" });
  }
};

export const login = (req, res) => {
  const sql = `
      SELECT u.username, u.password, e.email
      FROM User u
      JOIN Employee e ON u.employeeID = e.employeeID
      WHERE e.email = ?
  `;
  
  db.query(sql, [req.body.email], (err, data) => {
      if (err) return res.json({ Error: "Login Error in the server" });
      if (data.length > 0) {
          bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
              if (err) return res.json({ Error: "Password compare error" });
              if (response) {
                  const username = data[0].username;
                  const token = jwt.sign({ username }, "jwt-secret-key", { expiresIn: '1d' });
                  res.cookie('token', token);
                  return res.json({ Status: "Success" });
              } else {
                  return res.json({ Error: "Password not matched" });
              }
          });
      } else {
          return res.json({ Error: "Email does not exist" });
      }
  });
};

export const logout = (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success", Message: "Logged out successfully" });
};

//Get user data from the database
export const userInfo = async (req, res) => {
  const userId = req.params.id;
  try {
    // Connect to the database

    // Use db.query to execute the query
    db.query('SELECT username, email , address , userRole FROM user WHERE id = ?', [userId], (error, results) => {
      if (error) {
        console.error('Error fetching user info:', error);
        res.status(500).send('Server error');
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: 'User not found' });
        } else {
          res.json(results[0]);
        }
      }
    });

  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).send('Server error');
  }
};

//update user info from the profile front end 
export const updateUserInfo = async (req, res) => {
  const { id, username, email, address, userRole } = req.body;

  try {
    const updateSql = "UPDATE user SET username = ?, email = ?, address = ? WHERE id = ?";
    db.query(updateSql, [username, email, address, id], (err, result) => {
      if (err) return res.json({ Error: "Error updating user info in the server" });
      return res.json({ Status: "Success", Message: "User info updated successfully" });
    });
  } catch (err) {
    return res.json({ Error: "Error processing update request" });
  }
};

//Now the logic of the leave request 

export const leaveRequest = (req, res) => {
  const { leaveType, duration, fromDate, toDate, notes } = req.body;

  const query = 'INSERT INTO leave_requests (leaveType, duration, fromDate, toDate, notes) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [leaveType, duration, fromDate, toDate, notes], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error saving leave request');
          return;
      }

      sendNotificationToSupervisor(leaveType, duration, fromDate, toDate, notes);

      res.status(200).send('Leave request submitted successfully');
  });
};

function sendNotificationToSupervisor(leaveType, duration, fromDate, toDate, notes) {
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'ihabahmad11@icloud.com',
          pass: 'Ihabahmad123-'
      }
  });

  const mailOptions = {
      from: 'ihabahmad11@icloud.com',
      to: 'ihabahmad13@gmail.com',
      subject: 'New Leave Request Submitted',
      text: `A new leave request has been submitted with the following details:
        Leave Type: ${leaveType}
        Duration: ${duration}
        From: ${fromDate}
        To: ${toDate}
        Notes: ${notes}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
          console.error(err);
      } else {
          console.log('Email sent: ' + info.response);
      }
  });
}
