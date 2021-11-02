import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Upcoming Payments</Title>
      <Typography component="p" variant="h4">
        $124.00
      </Typography>
      <Typography color="primary.light">
        must be paid till
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2022
      </Typography>
      <div>
        
      </div>
    </React.Fragment>
  );
}