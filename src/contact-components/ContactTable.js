import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { DialogTitle, Dialog, DialogContent } from '@material-ui/core';
import ContactForm from './ContactForm';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from "react-router-dom";
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: theme.spacing(2),
  },
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  popDialog: {
    position: 'absolute',
    top: theme.spacing(2),
  },
  navbtn: {
    textDecoration: 'none',
    textTransform: "none",
  },
}));

const ContactTable = (props) => {
  const classes = useStyles();
  const { contacts, setContacts, contactDefault } = props;
  const [ openPop, setOpenPop ] = useState(false);
  const [ indexEdit, setIndexEdit ] = useState('');
  const [ contactEdit, setContactEdit ] = useState({});
  const [ page, setPage ] = React.useState(0);
  const [ rowsPerPage, setRowsPerPage ] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <>
      <TableContainer className={classes.heading} component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">

          <TableHead>
            <TableRow>
              
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Edit &nbsp; Delete</TableCell>

            </TableRow>
          </TableHead>

          
          <TableBody>
            {
              contacts.map( (contact, index) => (
                <TableRow key={index}>

                  <TableCell>
                    <Link 
                      to={`/contacts/${index}`}
                      className={classes.navbtn}
                    > 
                      <Button color="primary" className={classes.navbtn}>
                        { contact.firstName } { contact.middleName } { contact.lastName } 
                      </Button>
                    </Link>                  
                  </TableCell>

                  <TableCell>{ contact.phone }</TableCell>
                  <TableCell>{ contact.email }</TableCell>

                  <TableCell align="right">
                    <IconButton color="primary"
                      onClick={ () => {
                        setContactEdit(contact);
                        setIndexEdit(index);
                        setOpenPop(!openPop);
                      }}
                    >
                      <EditIcon fontSize="small"/>
                    </IconButton>
                    <IconButton color="secondary">
                      <DeleteIcon fontSize="small"/>
                    </IconButton>
                  </TableCell>

                </TableRow>
              ))
            }
          </TableBody>


        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={contacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>

      





      <Dialog 
        open={openPop}
        classes={{ paper: classes.popDialog }}
        maxWidth="md"
      >
        <DialogTitle>
          <div className={classes.pageHeader}>
            Edit Contact Form
            <Button
              variant="outlined"
              color="secondary"
              type="button" 
              onClick={ () => setOpenPop(!openPop)}
            >
              <CloseIcon />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          <ContactForm 
            setOpenPop={setOpenPop}
            contacts={contacts}
            setContacts={setContacts}
            contactDefault={contactDefault}
            contactEdit={contactEdit}
            indexEdit={indexEdit}
            operation='edit'
          />
        </DialogContent>
      </Dialog>

    </>
  )
}

export default ContactTable;