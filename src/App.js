import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Switch, Route, NavLink
} from "react-router-dom";

import TaskInput from './todo-components/TaskInput';
import Home from './home-components/Home';
import Contact from './contact-components/Contact';
import ContactDetails from './contact-components/ContactDetails';
import Dgraph from './dgraph-components/Dgraph';

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// import BottomNavigation from '@material-ui/core/BottomNavigation';
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import RestoreIcon from '@material-ui/icons/Restore';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#64b5f6',
      main: '#1976d2',
      dark: '#1976d2',
    }
  },
});

const useStyles = makeStyles( (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff'
  },
  spacing: {
    flexGrow: 1,
  },
  logo: {
    textTransform: "none",
    fontSize: "18px",
  },
  navbtn: {
    textDecoration: 'none',
  },
}));


function App() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline>   
        <ThemeProvider theme={theme}>
          <Router>

            <AppBar className={classes.root} position="static"> 
              <Toolbar>
                <NavLink to="/" className={classes.navbtn}>
                  <Button className={classes.logo}>
                    ajesh-mishra.github.io
                  </Button>
                </NavLink>
                <div className={classes.spacing}></div>    
                <NavLink to="/todo" className={classes.navbtn}>
                  <Button>To-Do</Button>
                </NavLink>
                <NavLink to="/contacts" className={classes.navbtn}>
                  <Button>Contact</Button>
                </NavLink>
                <NavLink to="/dgraph" className={classes.navbtn}>
                  <Button>DGraph</Button>
                </NavLink>
              </Toolbar>
            </AppBar>

            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/todo" component={TaskInput} />
              <Route path="/contacts" exact component={Contact} />
              <Route path="/contacts/:id" component={ContactDetails} />
              <Route path="/dgraph" component={Dgraph} />
            </Switch>

          </Router> 
        </ThemeProvider>          
      </CssBaseline>
    </>
  );
}

export default App;