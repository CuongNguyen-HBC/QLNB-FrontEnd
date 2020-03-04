import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    function isLogin(){
        const item = localStorage.getItem('authen-hbg')
       if(item === null) return false
       else return true
    }
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to = "/Login"/>
        )} />
    );
};

export default PrivateRoute;