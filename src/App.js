import './App.css';
import { Container } from '@material-ui/core';
import Header from './Header'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FormApproved from './Components/Users/Approved/MasterDataCustomer/Form'
import Login from './Components/Users/Login'
import Index from './Components/Page/Index'
import PrivateRoute from './Router/PrivateRoute'
import RequestList from './Components/Users/Approved/MasterDataCustomer/RequestList'
import ListMasterDataCustomer from './Components/Users/Approved/MasterDataCustomer/ListCustomer'
import UpdateCustomer from './Components/Users/Approved/MasterDataCustomer/UpdateCustomer'
import React, { Component } from 'react'
import axios from 'axios';
export default class App extends Component {
    constructor(props){
      super(props)
      this.state = {
        islogin:false
      }
    }
     
  render() {
   
    return (
     
      <div className="App" >
          <Router>
          <Route path="/Login" component={Login} />
          <PrivateRoute path="/" component={FormApproved} exact  />
          <PrivateRoute path="/masterdata-customer" component={FormApproved} exact />
          <PrivateRoute path="/masterdata-customer/list-request" component={RequestList} exact />
          <PrivateRoute path="/masterdata-customer/list-customer" component={ListMasterDataCustomer} exact />
          <PrivateRoute path="/masterdata-customer/update-customer" component={UpdateCustomer} exact />
          </Router>
      </div>
    )
  }
}

// function App() {
//   console.log(this.props.location)
//   return (
    // <div className="App">
    //     <Header />
    //     <Container maxWidth="xl">
    //         <Router>
    //           {/* <Route path="/Login" component={Login} />
    //           <PrivateRoute path="/masterdata-customer" component={FormApproved} exact >
                
    //           </PrivateRoute> */}
    //           <Route path="/Login" component={Login} />
    //         <PrivateRoute path="/masterdata-customer" component={FormApproved} prevPath={this.props.location}/>
    //         </Router>
    //     </Container>
    // </div>
//   );
// }
// export default App;
