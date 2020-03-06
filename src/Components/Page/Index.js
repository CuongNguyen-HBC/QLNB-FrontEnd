import React, { Component } from 'react'
import Header from '../../Header'
import { Container } from '@material-ui/core';
import {makeStyles} from '@material-ui/styles'
const useStyles = makeStyles(theme => ({
    root:{

    }
}))
export default function Index(props){
const classes = useStyles();
    return(
        <div className={classes.root}>
            <Header />
            <Container >
                this is a container
            </Container>
        </div>
    )
}