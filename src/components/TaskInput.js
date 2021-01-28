import React, { useState } from 'react';
import Tasks from './Tasks';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },

}));


const Header = () => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    name: '',
    isComplete: false,
  });

  function handleChange (e) {
    setTask( (prevTask) => {
      return {
        ...prevTask, 
        name: e.target.value
      }
    })
  }

  function handleSubmit (e) {
    e.preventDefault();
    setTask({
      name: '',
      isComplete: false,
    });
    setTasks(prevTasks => [task, ...prevTasks]);
  }


  return (
    <div className={classes.root}>      
      <Typography variant="h4" gutterBottom>
      <FormatListBulletedIcon />
      &nbsp;
      To-Do
      </Typography>
      <form  
        onSubmit={handleSubmit}
        noValidate 
        autoComplete="on"
      >
        <TextField 
          className={classes.TextField}
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
    </div>
  );
}

export default Header;