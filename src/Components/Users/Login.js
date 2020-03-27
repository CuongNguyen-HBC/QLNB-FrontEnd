import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login';
import { Box,Container, Grid, Card, CardActionArea,CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function Login(){
    function responseGoogle(response){
        if(response.error){
            console.log('refresh page')
        }else{
            localStorage.setItem('authen-hbg',response.tokenId)
            localStorage.setItem('fullname',response.profileObj.name)
            return (
                window.location.href='/'
            )
        }
         
      }
      const useStyles = makeStyles(theme => ({
        root:{
            marginTop:"20%",
        },
        media: {
            height:500,
            with:"100%"
          },
      
    }))
    const classes = useStyles();
       
        return (
                <Container maxWidth="md" >
                    <Box boxShadow={3}  className={classes.root}>
                        <Grid container>
                            <Grid item xs={6}>
                            <CardMedia
                                className={classes.media}
                                image="https://sanvemaybay.vn/includes/uploads/2019/03/H%E1%BB%93-Ph%C3%BA-Ninh3-e1553230494797.jpg"
                                title="Contemplative Reptile"
                                />
                            </Grid>
                            <Grid item xs={6} 
                                alignItems="center"
                                justify="center"
                            >
                                <Box
                                        justifyItems="center" justifyContent="center" alignItems="center"
                                        className={classes.root}
                                >
                                            <Grid container xs={12} direction="column"
                                                justify="center"
                                                alignItems="center">
                                        <Grid item >
                                        <Typography variant="h4" component="h4">HBC Login</Typography>
                                        </Grid>
                                        <Grid item>
                                        <GoogleLogin
                                            clientId="21143138695-q0f2creh1kb9dvanfhudjj225r1jhb1h.apps.googleusercontent.com"
                                            buttonText="Login"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                                />
                                        </Grid>
                                    </Grid>
                                         
                                    
                                </Box>
                               
                            </Grid>
                        </Grid>
                            
                    </Box>
                    
                </Container>
                
        )
    
}