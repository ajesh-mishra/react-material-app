import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import QueryResult from './QueryResult'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  input: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },
}));


const Dgraph = () => {
  const classes = useStyles()
  const [ inputQuery, setInputQuery ] = useState('')

  useEffect(() => {
    if(inputQuery !== '') {
      console.log('From useEffect block!')

    }
  }, [inputQuery])

  return (
    <Container className={classes.root}
      maxWidth="md" 
      style={{ backgroundColor: '#fff', minHeight: '100vh' }}
    > 
      <Grid container
        justify="flex-start"
        alignItems="center"
        spacing={1}
      >
        <Grid item><BubbleChartIcon /></Grid>
        <Grid item>
          <Typography variant="h5" >
            Dgraph
          </Typography>
        </Grid>
      </Grid>
      <br />

      <form 
        noValidate 
        autoComplete="off"
      >
        <Paper>
          <InputBase
            fullWidth
            placeholder="Type to Search Queries" 
            className={classes.input}
            onChange={ (e) => setInputQuery(e.target.value) }
          />
        </Paper>
      </form>

      <QueryResult />
      
    </Container>
  );

}

export default Dgraph;