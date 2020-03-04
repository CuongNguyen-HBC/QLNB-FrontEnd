import React from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import Header from './Header'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FormApproved from './Components/Users/Approved/MasterDataCustomer/Form'
import Login from './Components/Users/Login'
import PrivateRoute from './Router/PrivateRoute'
function App() {
  return (
    <div className="App">
        <Header />
        <Container maxWidth="xl">
            <Router>
              <Route path="/Login" component={Login} />
              <PrivateRoute path="/masterdata-customer" component={FormApproved} exact >
                
              </PrivateRoute>
             
            </Router>
        </Container>
    </div>
  );
}
export default App;
