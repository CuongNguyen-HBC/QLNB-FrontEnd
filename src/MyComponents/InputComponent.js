import React from 'react'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    inputlabel:{
        fontWeight:'bold'
      },
}))
export default function InputComponet(props){
    const classes = useStyles()
    return (
            <FormControl fullWidth>
                <InputLabel htmlFor="input-with-icon-adornment" className={classes.inputlabel}>{props.label}</InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment position="start">
                      {props.icon}
                    </InputAdornment>
                  }
                  value={props.value}
                  error={props.validate.error}
                  name={props.name}
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                />
                {props.validate.error ? <FormHelperText id="my-helper-text" color="error" error={props.validate.error}>{props.validate.mess}</FormHelperText> : ""  }
            </FormControl>

    )
}