import React from 'react';
// import { MemoryRouter as Router } from 'react-router';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  spacing: {
    flexGrow: 1,
  },
  logo: {
    textTransform: "none",
    fontSize: "18px",
  },
}));

// const LinkBehavior = React.forwardRef((props, ref) => (
//   <RouterLink ref={ref} to="/todo" {...props} />
// ));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="static">     
      <Router>
      
        <Toolbar>
          <Link>
            <Button className={classes.logo} to="/"
            >
              ajesh-mishra.github.io
            </Button>
          </Link>
          <div className={classes.spacing}></div>    
          <Link><Button to="/todo">To-Do</Button></Link>
          <Link><Button to="/contacts">Contact</Button></Link>
        </Toolbar>

      </Router>   
    </AppBar>
  );
}

export default Header;
