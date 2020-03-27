import React from 'react'
import SelectInput from './SelectInput'
import InputComponent from './InputComponent'
import { Grid, Typography, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import DeleteIcon from '@material-ui/icons/Delete'
import SendIcon from '@material-ui/icons/Send'
const useStyles = makeStyles(theme => ({
    root:{
        margin:theme.spacing(3),
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    title:{
        marginBottom:"1%",
        width:"100%"
    }
}))
//  Trong form gồm các options (Số input - Loại componet - props input - handleSubmit)
export default function FormComponent(props){
    const classes = useStyles();
    const components = props.components
   
    return(
        <form onSubmit={props.handleSubmit} onBlur={props.onBlur}>
            <Typography variant="h5" component="h5" align="left"><LabelImportantIcon /> {props.title}</Typography>
            <Divider className={classes.title} />
                <Grid container xs={12} spacing={5} >
                {components.map(i => {
                   return (
                           <Grid item xs={12} md={4} >
                               {i.Component}
                           </Grid>
                   )
                })
            }
                 </Grid>
                 
                 <Grid container xs={12} alignItems="flex-end" spacing={5}>
                     <Grid item xs={12} alignContent="flex-end">
                     <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            style={{float:"right"}}
                            className={classes.button}
                            startIcon={<SendIcon />}
                        >Gửi</Button>
                     </Grid>
                     
                 </Grid>
            
        </form>
    )
}