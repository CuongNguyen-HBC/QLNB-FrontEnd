import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ component: Component, path,prepath, ...rest })  => {
    function isLogin(){
        const item = localStorage.getItem('authen-hbg')
        if(item == null)
        return false
        else return true
    }
    return  (
        <Route
          path={path}
          {...rest}
          render={(props) => {
            
            return isLogin() ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/Login",
                  state: {
                    prevLocation: path,
                    error: "You need to login first!",
                  },
                }}
              />
            );
          }}
        />
      );
};

export default PrivateRoute;