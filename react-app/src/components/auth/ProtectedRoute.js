import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => {
  const member = useSelector(state => state.session.member)
  console.log('userssss', member)
  return (
    <Route {...props}>
      {(member)? props.children  : <Redirect to='/login' />}
    </Route>
  )
};


export default ProtectedRoute;
