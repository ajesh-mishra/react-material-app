import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(1),
    },
  },
}));

const TaskActions = (props) => {
  const classes = useStyles();
  const [ mark, setMark ] = useState(true);

  function clearAll() {
    props.setTasks([]);
  }

  function markToggle() {
    let updatedTasks = [...props.tasks];
    for (var i in updatedTasks) {
      updatedTasks[i].isComplete = mark;
    }
    props.setTasks(updatedTasks);
    setMark( !mark );
  }

  return (
    <>
      <div className={classes.root}>
        <Grid container 
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          <Grid item>
            <Button color="secondary"
              onClick={clearAll}
            >
              Clear All
            </Button>
          </Grid>
          <Grid item>
            <Button color="primary"
              onClick={markToggle}
            >
              {mark === true ? "mark all" : "unmark all"}
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default TaskActions;