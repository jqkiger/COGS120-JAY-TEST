import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';

import AddAPhoto from '@material-ui/icons/AddAPhoto';
import AddIcon from '@material-ui/icons/Add';
import withRoot from '../withRoot';
import AppBar from '../Components/AppBar.js'

const styles = theme => ({
  fab: {
    margin: 0,
    top: 'auto',
    left: 'auto',
    bottom: theme.spacing.unit*2,
    right: theme.spacing.unit*2,
    position: 'fixed',
  },
  top:{
    textAlign: 'center',
    paddingTop: theme.spacing.unit*0,
  },
});

const inputProps = {
  step: 0.01,
};

const options = [
  'Food',
  'Recreation',
  'Shopping',
  'Bills',
];

class Index extends React.Component {
  state = {
    open: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  handleEntering = () => {
    this.radioGroupRef.focus();
  };

  handleCancel = () => {
    this.setState({open:false, pageTwoOpen:false, confirmationOpen:false});
  };

  handleOk = () => {
    this.setState({open: false, pageTwoOpen: true});
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleClickDescription = () => {
    this.setState({descriptionOpen: true,});
  };

  handleCloseDescription = () =>{
    this.setState({descriptionOpen: false,});
  };

  handleClickPay = () => {
    this.setState({payOpen: true,});
  };

  handleClosePay = () => {
    this.setState({payOpen: false,});
  };

  handleClickRemind = () => {
    this.setState({remindOpen: true,});
  };

  handleCloseRemind = () => {
    this.setState({remindOpen: false,});
  };

  handleConfirmation=()=>{
    this.setState({confirmationOpen: true, pageTwoOpen:false})
  };

  handleCloseConfirmation = () => {
    this.setState({confirmationOpen: false,});
  };

  render() {
    const { value, ...other } = this.props;
    const { classes } = this.props;
    const { open, descriptionOpen, payOpen, remindOpen, pageTwoOpen, confirmationOpen } = this.state;
    
    return (
      <div>

          <Dialog
                  open={this.state.pageTwoOpen}
                  onClose={this.handleCancel}
                  aria-labelledby="add-people-dialog"
                >
                  <DialogTitle id="add-people-dialog">Add people to split activity Page</DialogTitle>
                  <DialogActions>
                    <Button onClick={this.handleCancel} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleConfirmation} color="primary">
                      Next
                    </Button>
                  </DialogActions>
          </Dialog>

          <Dialog
                  open={this.state.confirmationOpen}
                  onClose={this.handleCancel}
                  aria-labelledby="confirmation-dialog"
                >
                  <DialogTitle id="confirmation-dialog">Confirmation split activity Page</DialogTitle>
                  <DialogActions>
                    <Button onClick={this.handleCancel} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleCancel} color="primary">
                      Confirm
                    </Button>
                  </DialogActions>
          </Dialog>

          <Dialog
                  open={this.state.descriptionOpen}
                  onClose={this.handleCloseDescription}
                  aria-labelledby="description-dialog"
                >
                  <DialogTitle id="description-dialog">Split Activity Description Page</DialogTitle>
          </Dialog>
          <Dialog
                  open={this.state.payOpen}
                  onClose={this.handleClosePay}
                  aria-labelledby="pay-dialog"
                >
                  <DialogTitle id="pay-dialog">Payment Confirmation Page</DialogTitle>
          </Dialog>

          <Dialog
                  open={this.state.remindOpen}
                  onClose={this.handleCloseRemind}
                  aria-labelledby="remind-dialog"
                >
                  <DialogTitle id="remind-dialog">Methods to remind Page</DialogTitle>
          </Dialog>

          <div className={classes.top}>
          <AppBar/>
          <List>
          {[0, 1, 2, 3, 4, 5, 6].map(value => (
            <ListItem key={value} dense button onClick={() => this.handleClickDescription()}>
              <Avatar alt="Remy Sharp" src="http://multisim-insigneo.org/wp-content/uploads/2015/02/blank-profile-picture-300x300.png" />
              <ListItemText primary={`Split Activity ${value + 1}`} />
              <ListItemSecondaryAction>
                <Button variant="contained" color ={value %4 ===0 ? 'error':'secondary'} aria-label="pay" 
                onClick={() => (value %4 ===0 ? this.handleClickRemind():this.handleClickPay())}>
                {value %4 ===0 ? 'Remind':'Pay'}
                </Button>
              </ListItemSecondaryAction>

            </ListItem>
          ))}
        </List>
          </div>

          <div className={classes.fab}>
            <Button variant="fab" color="primary" aria-label="Add" onClick={this.handleClick}>
              <AddIcon/>
            </Button>
          </div>
          <div>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Create Split Activity</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To split a purchase please enter a description, the total cost, and the number of people involved.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="standard-required"
                  label="Description of purchase"
                  type="text"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="standard-required"
                  label="Total Cost"
                  type="number"
                  inputProps={inputProps}
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="standard-required"
                  label="Total people"
                  type="number"
                  fullWidth
                />
              </DialogContent>
              <DialogTitle id="confirmation-dialog-title">Activity Type</DialogTitle>
                <DialogContent>
                  <RadioGroup
                    ref={ref => {
                      this.radioGroupRef = ref;
                    }}
                    aria-label="Ringtone"
                    name="ringtone"
                    value={this.state.value}
                    onChange={this.handleChange}
                  >
                    {options.map(option => (
                      <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
                    ))}
                  </RadioGroup>
                  <Button onClick={this.handleClose} color="primary">                   
                    Add a picture of receipt
                  </Button>
                </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleOk} color="primary">
                  Next
                </Button>
              </DialogActions>
            </Dialog>
          </div>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
