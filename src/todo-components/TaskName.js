import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';


const useStyles = makeStyles((theme) => ({
  secondary: {
    color: theme.palette.text.secondary,
  },
  input: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    backgroundColor: theme.palette.grey[100],
  },
  button: {
    textTransform: "none",
  }
}));

const TaskName = (props) => {
  const classes = useStyles();
  const [ editMode, setEditMode ] = useState(false)

  function editTaskName(e) {      
    let updatedTasks = [...props.tasks];
    updatedTasks[props.index].name = e.target.value;
    props.setTasks(updatedTasks);
  }

  function handleKeyDown(e) {
    if ( e.keyCode === 13 ) {
      console.log('value', e.target.value);
      setEditMode(false);
   }
  }

  return (
    <>
      <TableCell align="left"
        className={ props.task.isComplete === true 
          ? classes.secondary 
          : '' }
        component="th" scope="row"
      >
        {
          editMode === true 
          ?
            <InputBase
              className={classes.input} 
              value={props.task.name}
              onChange={ (e) => editTaskName(e)}
              onKeyDown={ (e) => handleKeyDown(e) }
              inputProps={{ 'aria-label': 'naked' }}
            />
          :
            <Button 
              className={classes.button} 
              onClick={() => setEditMode(true)}
            >           
              {props.task.name}
            </Button>
        }
      </TableCell>
    </>
  )
}

export default TaskName;
// https://gfycat.com/frightenedsentimentalblackpanther