import React from 'react';
import { Grid, Typography } from '@material-ui/core';
export default function errorForm(props){
    if(props.isError){
        return(
            <div>
              <Grid container xs={12} spacing={10}>
                  <Grid item xs={12}>
                        <Typography variant="h6" component="h6" color="error">
                        {props.isMess}
                        </Typography>
                  </Grid>
              </Grid>
              
            </div>
        )
    }else return null
   
}