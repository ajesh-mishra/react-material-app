import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
}));

const Form = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}
      maxWidth="md" 
      style={{ backgroundColor: '#fff', height: '100vh' }}
    >
      <h1>Home</h1>
    </Container>
  )
}

export default Form;