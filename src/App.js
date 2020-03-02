import React from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import Header from './Header'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FormApproved from './Components/Users/Approved/MasterDataCustomer/Form'
function App() {
  return (
    <div className="App">
        <Header />
        <Container maxWidth="xl">
          <Router>
            <Route path="/"  exact >
              <FormApproved />
            </Route>
          </Router>
        </Container>
    </div>
  );
}
export default App;
