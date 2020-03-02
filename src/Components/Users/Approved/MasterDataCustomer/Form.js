import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
       
      },
    },
  }));
export default function FormMasterDataCustomer(){
    const classes = useStyles();

    return (
        <Grid container xs={12} spacing={1}>
            <form className={classes.root} noValidate autoComplete="off">
                <Grid item xs={12} >
                    <Typography  xs={6}>
                    <TextField id="standard-basic" label="Standard" />
                    </Typography>
                    <Typography  xs={6}>
                    <Typography id="standard-basic" label="Standard" />
                    </Typography>
                
                </Grid> 
                
            </form>
        </Grid>
      
    );
}