import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, page, issue, status) {
  return { id, date, page, issue, status };
}

const rows = [
  createData(
    0,
    '16 Mar, 2021',
    'Home',
    'Gallery',
    'being designed'
  ),
  createData(
    1,
    '16 Mar, 2021',
    'Home',
    'Background images',
    'Done'
  ),
  createData(2, '16 Mar, 2021', 'Contact', 'Background images', 'Done'),
  createData(
    3,
    '16 Mar, 2021',
    'Contact',
    'form',
    'being developed',

  ),
  createData(
    4,
    '15 Mar, 2021',
    'Global Block',
    'Footer',
    'Done',

  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Notifications() {
  return (
    <React.Fragment>
      <Title>Recent Notifications</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Page</TableCell>
            <TableCell>Issue</TableCell>
            <TableCell>Status</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.page}</TableCell>
              <TableCell>{row.issue}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </React.Fragment>
  );
}