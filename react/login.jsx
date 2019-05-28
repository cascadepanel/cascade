import React from 'react';
import ReactDOM from 'react-dom';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2)
    }
}));

function LoginPage() {
    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h5" component="h3">
                    Login
                </Typography>
                <form>
                    <TextField label="Username"/>
                </form>
            </Paper>
        </div>
    );
}

const container = document.querySelector('#app');

ReactDOM.render(<LoginPage />, container);