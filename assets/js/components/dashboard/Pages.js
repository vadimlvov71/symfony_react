import * as React from 'react';
import { useHistory } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeepMountedModal from './KeepMountedModal';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, status, paymentMethod, amount) {
  return { id, date, name, status, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Home',
    'under pending',
    'Johnson',
    'Petrenko',
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Contacts',
    'under designing',
    'Natan Gold',
    'Petrenko',
  ),
  createData(2, '16 Mar, 2019', 'Gallery', 'no content', 'Johnson', 'Dubov'),
  createData(
    3,
    '16 Mar, 2019',
    'About us',
    'Done',
    'Natan Gold',
    'Dubov',
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Blog',
    'no content',
    'Johnson',
    'Dubov',
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
export default function Orders() {
  const history = useHistory();
  const handleRouteHistory = (page) =>{ 
    history.push("?issue=" + page);
  }
  const handleRouteContent = (page) =>{ 
    history.push("?page=" + page);
  }
  return (
    <Grid item xs={12}>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
    <React.Fragment>
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Title>Pages</Title>
      </Grid>
      <Grid item xs={4}>
      <KeepMountedModal /> 
      </Grid>
    </Grid>
      <Table size="small" aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell>Status</StyledTableCell>
          <StyledTableCell>Last PM</StyledTableCell>
          <StyledTableCell align="right">Last dev</StyledTableCell>
          <StyledTableCell>Date</StyledTableCell>
          <StyledTableCell>Detail</StyledTableCell>
          <StyledTableCell>Management</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            
            <TableRow key={row.id}>
              
              <TableCell>{row.name}</TableCell>
              {row.status == 'Done' || row.status == 'no content' ? (
                  row.status == 'Done' ? (
                    <TableCell sx={{color: 'success.main',}}>{row.status}</TableCell>
                  ) : (
                    <TableCell sx={{color: 'error.light',}}>{row.status}</TableCell>
                  )
              ) : (
                <TableCell>{row.status}</TableCell>
              )}
              
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`${row.amount}`}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell> <Button size="small" variant="contained" onClick={() => handleRouteHistory(50)}>Readmine History</Button></TableCell>
              <TableCell> <Button size="small" variant="contained" onClick={() => handleRouteContent(row.name)}>Content</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </React.Fragment>
    </Paper>
  </Grid>
  
  );
}