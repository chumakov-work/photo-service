import React from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import {MenuIcon} from '@material-ui/icons';

const Header = props => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{color: "#fff"}}>
              Photo-service
            </Link>
          </Typography>

          { props.loggedIn ?
            <Link to="/me" style={{color: "#fff"}}><Button color="inherit">Профиль</Button></Link> : 
            <Link to="/login" style={{color: "#fff"}}><Button color="inherit">Войти</Button></Link>
          }

        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn
  }
}

export default connect(mapStateToProps, null)(Header)