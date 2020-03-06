import React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
export default function errorForm(props){
    if(props.isError){
        return(
            <div>
              <Grid container xs={12} spacing={10}>
              <Grid item xs={5} alignContent="flex-start">
                  <Typography variant="h5" component="h5" >
                        Tạo mã khách hàng
                        </Typography>
                  </Grid>
                  <Grid item xs={7}>
                        <Typography variant="h6" component="h6" color="error">
                        {props.isMess}
                        </Typography>
                  </Grid>
              </Grid>
              
            </div>
        )
    }else return (
        <Grid container xs={12} spacing={10}>
            <Grid item xs={5} alignContent="flex-start">
                  <Typography variant="h5" component="h5" >
                        Tạo mã khách hàng
                        </Typography>
                      
                  </Grid>
                  
              </Grid>
    )
   
}