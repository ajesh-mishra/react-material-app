import React, { useState } from 'react';
import Tasks from './Tasks';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },

}));


const Header = () => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    name: '',
    isComplete: false,
  });

  function handleChange(e) {
    setTask( (prevTask) => {
      return {
        ...prevTask, 
        name: e.target.value
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTask({
      name: '',
      isComplete: false,
    });
    setTasks(prevTasks => [task, ...prevTasks]);
  }


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
        <Grid item><FormatListBulletedIcon /></Grid>
        <Grid item>
          <Typography variant="h5" >
            To-Do
          </Typography>
        </Grid>
      </Grid>
      <br />

      <form  
        onSubmit={handleSubmit}
        noValidate 
        autoComplete="off"
      >
        <TextField 
          fullWidth 
          id="outlined-basic" 
          label="Create New Task" 
          variant="outlined" 
          margin="dense"
          helperText="Type in the box above and hit enter!"
          value={task.name}
          onChange={ (e) => handleChange(e) }
        />
      </form>
      
      <Tasks 
        tasks={tasks}
        setTasks={setTasks}
      />
    </Container>
  );
}

export default Header;