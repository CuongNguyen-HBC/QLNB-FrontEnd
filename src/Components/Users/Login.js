import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login';


export default class Login extends React.Component {
    constructor(props){
        super(props)
    }
    responseGoogle(response){
        if(response.error){
            console.log('refresh page')
        }else{
            localStorage.setItem('authen-hbg',response.tokenId)
            return (
                window.location.href='/'
            )
        }
         
      }
    render() {
        return (
            <div>
                 <GoogleLogin
                        clientId="21143138695-q0f2creh1kb9dvanfhudjj225r1jhb1h.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                    />,
            </div>
        )
    }
}
