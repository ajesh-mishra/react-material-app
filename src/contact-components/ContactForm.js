import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


// const contact = {
//   firstName: '',
//   middleName: '',
//   lastName: '',
//   email: '',
//   address: '',
//   phone: '',
//   company: '',
//   gender: 'male',
//   relationship: 'friend',
//   dateOfBirth: new Date(),
// };

const ContactForm = (props) => {
  const classes = useStyles();
  const [ formValue, setFormValue ] = useState(props.contactEdit);
  const [ formError, setFormError ] = useState(props.contactDefault);
  // console.log('indexEdit props: ', props.indexEdit);
  // console.log('contactEdit props: ', props.contactEdit);

  const handleDateChange = (date) => {
    setFormValue({
      ...formValue,
      dateOfBirth: date,
    });
  };

  function handleChange (e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function validate () {
    const error = {};
    let submit = true;

    formValue.firstName === '' 
    ? error.firstName = 'First Name is a mandatory field.' 
    : error.firstName = '';

    formValue.lastName === ''
    ? error.lastName = 'Last Name is a mandatory field.'
    : error.lastName = '';

    formValue.address === ''
    ? error.address = 'Address is a mandatory field.'
    : error.address = '';

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (formValue.email === '') {
      error.email = 'Email is a mandatory field.';
      submit = false;
    } else if (! re.test(String(formValue.email).toLowerCase())) {
      error.email = 'Email doesn\'t seem valid.';
      submit = false;
    } else {
      error.email = '';
    }
    
    if (formValue.phone === '') {
      error.phone = 'Phone is a mandatory field.';
      submit = false;
    } else if (formValue.phone.length !== 10) {
      error.phone = 'Phone number should have 10 digits.';
      submit = false;
    } else {
      error.phone = '';
    }

    setFormError({
      ...formError,
      ...error,
    });

    return submit;
  }

  function handleSubmit (e) {
    e.preventDefault();
    if (validate()) {
      console.log('submit!!');

      let tempContacts = props.contacts.slice();

      if ( props.operation === 'new' ) {
        tempContacts.push(formValue);
      } else if (props.operation === 'edit') {
        tempContacts[props.indexEdit] = formValue;
      }

      props.setContacts(tempContacts);
      localStorage.setItem("contacts", JSON.stringify(tempContacts));      
      props.setOpenPop(false);

    } else {
      console.log('dont submit!!');
    }
  }


  return (
    <form  
        onSubmit={handleSubmit}
        noValidate 
        autoComplete="off"
      >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
        <TextField   
          fullWidth 
          required   
          label="First Name" 
          variant="outlined" 
          margin="dense"
          name="firstName"
          value={formValue.firstName}
          onChange={handleChange}
          { ...(formError.firstName && {
            'error': true, 'helperText': formError.firstName})
          }
        /></Grid>

        <Grid item xs={12} sm={4}>
        <TextField
          fullWidth    
          label="Middle Name" 
          variant="outlined" 
          margin="dense"
          name="middleName"
          value={formValue.middleName}
          onChange={handleChange}
          { ...(formError.middleName && {
            'error': true, 'helperText': formError.middleName})
          }
        /></Grid>
  
        <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          required   
          label="Last Name" 
          variant="outlined" 
          margin="dense"
          name="lastName"
          value={formValue.lastName}
          onChange={handleChange}
          { ...(formError.lastName && {
            'error':true, 'helperText':formError.lastName})
          }
        /></Grid>


        <Grid item xs={12} sm={6}>
        <TextField
          fullWidth  
          required   
          label="Phone"
          type="number"
          variant="outlined" 
          margin="dense"
          name="phone"
          value={formValue.phone}
          onChange={handleChange}
          { ...(formError.phone && {
            'error':true, 'helperText':formError.phone})
          }
        /></Grid>


        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required 
            label="Email" 
            variant="outlined" 
            margin="dense"
            name="email"
            value={formValue.email}
            onChange={handleChange}
            { ...(formError.email && {
              'error':true, 'helperText':formError.email})
            }
          />
        </Grid>


        <Grid item xs={12} sm={6}>
        <TextField
          fullWidth     
          label="Company" 
          variant="outlined" 
          margin="dense"
          name="company"
          value={formValue.company}
          onChange={handleChange}
          { ...(formError.company && {
            'error':true, 'helperText':formError.company})
          }
        /></Grid>


        <Grid item xs={12} sm={3}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              fullWidth
              className={classes.formControl}
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date of Birth"
              name="dateOfBirth"
              value={formValue.dateOfBirth}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            id="outlined-multiline-static"
            label="Address"
            multiline
            rows={5}
            variant="outlined"
            name="address"
            value={formValue.address}
            onChange={handleChange}
            { ...(formError.address && {
              'error':true, 'helperText':formError.address})
            }
          />
        </Grid>


        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Gender</FormLabel>          
            <RadioGroup row aria-label="gender" name="gender" value={formValue.gender} onChange={handleChange}>
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
        </Grid>


        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined" className={classes.selectEmpty}>
            <InputLabel id="demo-simple-select-outlined-label">Relationship</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              name="relationship"
              value={formValue.relationship}
              onChange={handleChange}
              label="Relationship"
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              <MenuItem value="friend">Friend</MenuItem>
              <MenuItem value="family">Family</MenuItem>
              <MenuItem value="office">Office</MenuItem>
              <MenuItem value="gym">Gym</MenuItem>
              <MenuItem value="social">Social</MenuItem>
            </Select>
            <FormHelperText>How do you know the person?</FormHelperText>
          </FormControl>
        </Grid>


      </Grid>


      <br /><br />
      

      <Grid container 
        spacing={2}
        justify="flex-end"
      >
        <Grid item>
          <Button onClick={ () => props.setOpenPop(false) }
          >Cancel</Button>
        </Grid>
        <Grid item>
          <Button type="submit" 
            variant="contained" 
            color="primary"
            // { 
            //   ...(disableSubmit && {'disabled': true})
            // }
          >
            Submit
          </Button>
        </Grid>
      </Grid>

      <br />

      {/* <pre>
        {JSON.stringify(formValue, null, 2)}
      </pre>
      <pre>
        {JSON.stringify(formError, null, 2)}
      </pre> */}

    </form>
  )
}

export default ContactForm;