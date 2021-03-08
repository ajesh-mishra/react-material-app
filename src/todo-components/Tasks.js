import React, { useState } from 'react';
import TaskActions from './TaskActions';
import TaskName from './TaskName';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: theme.spacing(2),
  },
  error: {
    marginTop: theme.spacing(2),
    color: theme.palette.secondary.main,
  },
  secondary: {
    color: theme.palette.text.secondary,
  },
  success: {
    color: theme.palette.success.main,
  },
  primary: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.grey[100],
  }
}));

const Tasks = (props) => {
  const classes = useStyles();
  const [ filtering, setFiltering ] = useState(false);

  const deleteTask = (index) => {
    let updatedTasks = [...props.tasks];
    updatedTasks.splice(index, 1);
    props.setTasks( () => updatedTasks);
  }

  const toggleComplete = (index) => {
    let updatedTasks = [...props.tasks];
    updatedTasks[index]['isComplete'] = !updatedTasks[index]['isComplete'];
    props.setTasks( () => updatedTasks);
  }

  const filterTasks = () => {
    let pendingTasks = props.tasks.filter(function (task) {
      return task.isComplete === false;
    });
    let completedTasks = props.tasks.filter(function (task) {
      return task.isComplete === true;
    });

    if ( filtering === false ) 
      props.setTasks([...pendingTasks, ...completedTasks]);
    else 
      props.setTasks([...completedTasks,...pendingTasks]);

    setFiltering(!filtering);
  }

  if (props.tasks.length === 0) {
    return (
      <Typography variant="overline" display="block" 
        gutterBottom className={classes.error}
      >
        TASK LIST IS EMPTY.
      </Typography>
    )
  } else {
    return (
      <>
        <TaskActions 
          tasks={props.tasks}
          setTasks={props.setTasks}
        />

        <TableContainer className={classes.heading} component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">

            <TableHead>
              <TableRow>
                
                <TableCell>
                  <IconButton
                    onClick={filterTasks}
                    className={ filtering === true
                      ? classes.primary
                      : ''
                    }
                  >
                    <FilterListIcon fontSize="small"/>
                  </IconButton>
                </TableCell>
                <TableCell>Task</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {
                props.tasks.map( (task, index) => (                
                  <TableRow key={index}>

                    <TableCell align="left">
                      <IconButton 
                        className={ task.isComplete.toString() === 'true' 
                          ? classes.success 
                          : '' }
                        aria-label="done"
                        onClick={ () => toggleComplete(index) }
                      >                        
                        { task.isComplete.toString() === 'true' 
                          ? <DoneAllIcon fontSize="small"/> 
                          : <DoneIcon fontSize="small"/> }
                      </IconButton>
                    </TableCell>  

                    <TaskName 
                      task={task}
                      index={index}
                      tasks={props.tasks}
                      setTasks={props.setTasks}
                    />

                    <TableCell align="right">
                      <IconButton 
                        aria-label="delete"
                        onClick={ () => deleteTask(index) }
                      >
                        <DeleteIcon fontSize="small"/>
                      </IconButton>
                    </TableCell>
                   
                  </TableRow>

                ))
              }
            </TableBody>              
                    
          </Table>
        </TableContainer>   
      </>
    )
  }
}

export default Tasks;