import React, { useState, useEffect } from 'react';
import ContactTable from './ContactTable';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Grid from '@material-ui/core/Grid';
import ContactForm from './ContactForm';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Hidden from '@material-ui/core/Hidden';
import { DialogTitle, Dialog, DialogContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  popDialog: {
    position: 'absolute',
    top: theme.spacing(2),
  },
  error: {
    marginTop: theme.spacing(2),
    color: theme.palette.secondary.main,
  },
  
}));

const contactDefault = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  address: '',
  phone: '',
  company: '',
  gender: 'male',
  relationship: 'friend',
  dateOfBirth: new Date(),
};

const Contact = () => {
  const classes = useStyles(); 
  const [ openPop, setOpenPop ] = useState(false);
  const [ contacts, setContacts ] = useState([]);

  useEffect( () => {
    let tempContacts = localStorage.getItem('contacts');
    tempContacts && setContacts(JSON.parse(tempContacts));
  }, []);


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
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddIcon />}
            type="button" 
            onClick={ () => setOpenPop(!openPop)}
          >
            Add <Hidden smDown>Contact</Hidden>
          </Button>
        </div>


        <br /><br />


        {
          contacts.length === 0
          ? (
              <Typography variant="overline" display="block" 
                gutterBottom className={classes.error}
              >
                CONTACT LIST IS EMPTY.
              </Typography>
            )
          : (

              <>
                <Grid container
                  justify="space-between"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item xs={12} sm={8}>
                  <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
                    <OutlinedInput
                      // margin="dense"
                      id="outlined-adornment-amount"
                      placeholder="Search Contact List"
                      // value={values.amount}
                      // onChange={handleChange('amount')}
                      startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
                      labelWidth={55}
                    />
                  </FormControl>
                  </Grid>
                </Grid>

                <ContactTable 
                  contacts={contacts}
                  setContacts={setContacts}
                  contactDefault={contactDefault}
                />
              </>

            )
          }

        {/* <pre>
          {JSON.stringify(contacts, null, 2)}
        </pre> */}


        <Dialog 
          open={openPop}
          classes={{ paper: classes.popDialog }}
          maxWidth="md"
        >
          <DialogTitle>
            <div className={classes.pageHeader}>
              Add Contact Form
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
              contactEdit={contactDefault}
              operation='new'
            />
          </DialogContent>
        </Dialog>

      </Container>
    )
  // }
}

export default Contact;