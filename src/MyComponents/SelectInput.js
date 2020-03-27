import React from 'react'
import {Select, MenuItem } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    inputlabel:{
        fontWeight:'bold'
      },
}))
// SelectItem bao gồm (name, value , list value [{val:text}] )
export default function SelectInput(props){
    const classes = useStyles()
    return(
        <FormControl fullWidth>
            <InputLabel htmlFor="input-with-icon-adornment" className={classes.inputlabel}>{props.label}</InputLabel>
        <Select 
        id="input-with-icon-adornment"
        onChange={props.onChange}
        name={props.name}
        defaultValue={props.value}
        startAdornment={
            <InputAdornment position="start">
                      {props.icon}
                    </InputAdornment>
        }
        >
            {
                props.listvalue.map(i => {
                    return (
                    <MenuItem value={i.val}>{i.text}</MenuItem>
                    )
                })
            }
        </Select></FormControl>
    )
}