import React from "react";

import "./AttendanceHistory.scss";
import DataTable from "../../components/AttendanceDataTable/DataTable";

function AttendanceHistory() {
  return (
    <div className="Attendance">
      <div className="title">
        <h1>Attendance Overview</h1>
      </div>
       <DataTable />
    </div>
  )
}

export default AttendanceHistory
