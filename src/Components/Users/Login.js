import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login';
const responseGoogle = (response) => {
    if(response.error){
        console.log('refresh page')
    }else{
        localStorage.setItem('authen-hbg',response.tokenId)
    }
     
  }
export default class Login extends Component {
    render() {
        return (
            <div>
                 <GoogleLogin
                        clientId="21143138695-q0f2creh1kb9dvanfhudjj225r1jhb1h.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    />,
            </div>
        )
    }
}
