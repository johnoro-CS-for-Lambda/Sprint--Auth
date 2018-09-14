import React from 'react';
import { Alert } from 'reactstrap';
import { Link } from 'react-router-dom';

export default ({ color }) => (
  <Alert color={color}>
    Please {" "}
    <Link to="/signin">sign in</Link> 
    {" "} or {" "}
    <Link to="/signup">sign up</Link> 
    {" "} to view the jokes!
  </Alert>
);
