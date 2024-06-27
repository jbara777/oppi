import React from 'react';
import './DataTable.scss';

const DataTable = () => {
  const columns = [
    { field: 'date', headerName: 'Date' },
    { field: 'day', headerName: 'Day' },
    { field: 'checkIn', headerName: 'Check-In' },
    { field: 'checkOut', headerName: 'Check-Out' },
    { field: 'workHours', headerName: 'Work Hours' },
    { field: 'status', headerName: 'Status' }
  ];

  const rows = [
    { id: 1, date: '2023-06-20', day: 'Monday', checkIn: '09:00 AM', checkOut: '05:00 PM', workHours: 8, status: 'Work From Office' },
    { id: 2, date: '2023-06-21', day: 'Tuesday', checkIn: '09:10 AM', checkOut: '05:15 PM', workHours: 8, status: 'Work From Home' },
    { id: 3, date: '2023-06-22', day: 'Wednesday', checkIn: '09:00 AM', checkOut: '05:00 PM', workHours: 8, status: 'Absent' },
    { id: 4, date: '2023-06-23', day: 'Thursday', checkIn: '08:50 AM', checkOut: '04:50 PM', workHours: 8, status: 'Late Arrival' },
    { id: 5, date: '2023-06-24', day: 'Friday', checkIn: '09:00 AM', checkOut: '04:00 PM', workHours: 7, status: 'Work From Home' },
    { id: 6, date: '2023-06-25', day: 'Saturday', checkIn: 'Day Off', checkOut: 'Day Off', workHours: 0, status: 'Work From Office' },
    { id: 7, date: '2023-06-26', day: 'Sunday', checkIn: 'Day Off', checkOut: 'Day Off', workHours: 0, status: 'Absent' },
    { id: 8, date: '2023-06-27', day: 'Monday', checkIn: '09:05 AM', checkOut: '05:00 PM', workHours: 7.92, status: 'Late Arrival' },
    { id: 9, date: '2023-06-28', day: 'Tuesday', checkIn: '09:00 AM', checkOut: '05:00 PM', workHours: 8, status: 'Late Arrival' },
  ];

  return (
    
    <div className="dataTable">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.field}>{column.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.field}>
                  {row[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
