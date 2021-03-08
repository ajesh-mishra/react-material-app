import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  navbtn: {
    textDecoration: 'none',
    textTransform: "none",
  },
  heading: {
    marginTop: theme.spacing(2),
  },
}));

const ContactDetails = ({ match }) => {
  const classes = useStyles();

  const index = match.params.id;
  const tempContacts = localStorage.getItem("contacts");
  const contacts = JSON.parse(tempContacts);
  const contact = contacts[index];

  const getTableCells = Object.keys(contact).map( (property) => (
    <TableRow key={property}>
      <TableCell>{ property }</TableCell>
      <TableCell align="right">{ contact[property] }</TableCell>
    </TableRow>
    )
  )

  return (
    <Container className={classes.root}
      maxWidth="md" 
      style={{ backgroundColor: '#fff', minHeight: '100vh' }}
    >
      <div className={classes.pageHeader}>
        <Grid container
          justify="flex-start"
          alignItems="center"
          spacing={1}
        >
          <Grid item><SupervisorAccountIcon /></Grid>
          <Grid item>
            <Typography variant="h5">
              Contact
            </Typography>
          </Grid>
        </Grid>
        <Link to={'/contacts'}
          className={classes.navbtn}
        >
          <Button
            // variant="contained"
            color="primary"
            startIcon={<ArrowBackIosIcon />}
            type="button" 
          >
            Back 
          </Button>
        </Link>
      </div>

      <TableContainer className={classes.heading} component={Paper}>
        <Table className={classes.table}  aria-label="a dense table">
        
          <TableBody>
            { getTableCells }
          </TableBody>

        </Table>
      </TableContainer>

    </Container>
  )
}

export default ContactDetails;