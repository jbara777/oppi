import React, { useState } from "react";
import axios from "axios";
import "./LeaveReq.scss";

function LeaveReq() {
  const [leaveType, setLeaveType] = useState("");
  const [duration, setDuration] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const leaveRequest = { leaveType, duration, fromDate, toDate, notes };

    try {
      const response = await axios.post("http://localhost:3001/api/auth/leave", leaveRequest, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("Leave request submitted successfully!");
      } else {
        alert("Failed to submit leave request");
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="leave-management">
      <div className="leave-management__header">
        <h1>Leave Form</h1>
      </div>
      <form className="leave-management__form" onSubmit={handleSubmit}>
        <div className="leave-management__form-group">
          <label htmlFor="leave-type">Leave Type</label>
          <select id="leave-type" className="leave-management__select" value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
            <option value="">Select Leave Type</option>
            <option value="half-day">Sick Leave</option>
            <option value="full-day">Casual Leave</option>
            <option value="full-day">Paid Leave</option>
            <option value="full-day">Unpaid Leave</option>
            <option value="full-day">Emergency Leave</option>
          </select>
        </div>
        <div className="leave-management__form-group">
          <label>
            <input type="radio" name="duration" value="half-day" onChange={(e) => setDuration(e.target.value)} /> Half Day
          </label>
          <label>
            <input type="radio" name="duration" value="full-day" onChange={(e) => setDuration(e.target.value)} /> Full Day
          </label>
        </div>
        <div className="leave-management__form-group">
          <label htmlFor="from-date">From</label>
          <input type="date" id="from-date" className="leave-management__input" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <label htmlFor="to-date">To</label>
          <input type="date" id="to-date" className="leave-management__input" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
        <div className="leave-management__form-group">
          <label htmlFor="documents">Attach Documents</label>
          <input type="file" id="documents" className="leave-management__file-input" />
        </div>
        <div className="leave-management__form-group">
          <label htmlFor="notes">Notes</label>
          <textarea id="notes" className="leave-management__textarea" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
        </div>
        <button type="submit" className="leave-management__submit">Submit</button>
      </form>
    </div>
  );
}

export default LeaveReq;
