import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from '@material-ui/core/Checkbox';

import AddAPhoto from "@material-ui/icons/AddAPhoto";
import AddIcon from "@material-ui/icons/Add";
import withRoot from "../withRoot";
import AppBar from "../Components/AppBar.jsx";
import ActivityList from "../Components/ActivityList.jsx";

const styles = theme => ({
  fab: {
    margin: 0,
    top: "auto",
    left: "auto",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    position: "fixed"
  },
  top: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 0
  }
});

const inputProps = {
  step: 0.01
};

const options = ["Food", "Recreation", "Shopping", "Bills", "Other"];


function getFriends(){
  return JSON.parse(sessionStorage.getItem('people'));
}

  //Returns all activities
function getHistory(){
    var history = JSON.parse(sessionStorage.getItem('activities'));
    if(sessionStorage.getItem('called') != "1"){
      history = history.list;
    }
    return history;
}

class Home extends React.Component {
  state = {
    open: false,
    description: "",
    checked: [],
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleClick = () => {
    this.setState({
      open: true
    });
  };

  handleEntering = () => {
    this.radioGroupRef.focus();
  };

  handleCancel = () => {
    this.setState({ open: false, pageTwoOpen: false, confirmationOpen: false });
  };

  handleOk = () => {
    console.log(this.state.people);
    var ppl = parseInt(this.state.people);
    var amnt = parseFloat(this.state.amount);
    console.log(ppl);
    console.log(amnt);
    if(!isNaN(ppl) && !isNaN(amnt) && this.state.description != ""){
      this.setState({ open: false, pageTwoOpen: true });
    }
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleConfirmation = () => {
    var ppl = parseInt(this.state.people);
    var added = this.state.checked.length;
    if(added == ppl-1){
      this.setState({ confirmationOpen: true, pageTwoOpen: false });
    }
  };

  handleCreateActivity = () => {
    this.updateData();
    this.setState({ confirmationOpen: false });
  };

  handleChangeDescription = (event) => {
    this.setState({ description: event.target.value });    
  };

  handleChangeAmount = (event) => {
    this.setState({ amount:event.target.value });
    console.log(this.state.amount);
  };

  handleChangePeople = (event) => {
    this.setState({ people: event.target.value });
  };

  handleToggle = val=> () => {
    var value = parseInt(val);
    console.log(value);
    //value = value -1;
    const {checked} = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  calculateCharge(){
    var total = parseFloat(this.state.amount);
    var totalPeople = parseFloat(this.state.people);
    return (total/totalPeople).toFixed(2);
  }

  getPeopleAdded(){
    var peopleList = [];
    var friends = getFriends().list;
    if(!this.state.confirmationOpen){
      return peopleList;
    }
    console.log(friends);
    console.log(this.state.checked);
    console.log(friends[0].name)
    var charge = this.calculateCharge();
    for(var i=0; i<this.state.people-1;i++){
      var ind = this.state.checked[i];
      var fname = friends[ind-1].name;
      peopleList.push({id:(i+1), name:fname, amount: charge, paid: 0})
    }
    console.log(peopleList);
    return peopleList;
  }

  updateData(){
    var activities = getHistory(); 
    var peopleList = this.getPeopleAdded();  
    var data = { id: activities.length,
                title: "New Activity (PlaceHolder)",
                date: "11/7/2018",
                description: this.state.description,
                lender: "0",
                total: this.state.amount,
                owner: "Jonathan Kiger",
                complete: "0",
                participants: peopleList
            }
    console.log(data);
    activities.push(data);
    console.log(activities);
    sessionStorage.setItem('activities', JSON.stringify(activities));
    sessionStorage.setItem('called', "1");
    this.setState(this.state);
  }

  render() {
    const { value, ...other } = this.props;
    const { classes } = this.props;
    const {
      open,
      pageTwoOpen,
      confirmationOpen,
      description,
      amount,
      people,
      checked,
    } = this.state;
    const friends = getFriends();

    return (
      <div>
      <AppBar/>
        <Dialog
          open={this.state.pageTwoOpen}
          onClose={this.handleCancel}
          aria-labelledby="add-people-dialog"
        >
          <DialogTitle id="add-people-dialog">
            Add people to split activity Page
          </DialogTitle>
          <DialogContent>
          <List dense>
          {console.log(friends.list)}
          {friends.list.map(value => (
            <ListItem key={value} button>
              <Avatar alt="Remy Sharp" src="http://multisim-insigneo.org/wp-content/uploads/2015/02/blank-profile-picture-300x300.png" />
              <ListItemText primary={value.name} />
              <ListItemSecondaryAction>
                <Checkbox
                  onChange={this.handleToggle(value.id)}
                  checked={this.state.checked.indexOf(value.id) !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
          </DialogContent>
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
          <DialogTitle id="confirmation-dialog">
            Confirmation split activity Page(Even split for now)
          </DialogTitle>
          <DialogContent>
          <List dense>
          {this.getPeopleAdded().map(value => (
            <ListItem key={value} button>
              <Avatar alt="Remy Sharp" src="http://multisim-insigneo.org/wp-content/uploads/2015/02/blank-profile-picture-300x300.png" />
              <ListItemText primary={value.name +" is being charged $"+this.calculateCharge()} />
            </ListItem>
          ))}
          </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCreateActivity} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        

        <ActivityList type={"active"}/>

        <div className={classes.fab}>
          <Button
            variant="fab"
            color="primary"
            aria-label="Add"
            onClick={() => this.handleClick()}
          >
            <AddIcon />
          </Button>
        </div>
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              Create Split Activity
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                To split a purchase please enter a description, the total cost,
                and the number of people involved (including yourself).
              </DialogContentText>
              <TextField
                autoFocus
                value={this.state.description}
                margin="dense"
                id="standard-required"
                label="Description of purchase"
                type="text"
                fullWidth
                onChange={this.handleChangeDescription}
              />
              <TextField
                autoFocus
                value={this.state.amount}
                margin="dense"
                id="standard-required"
                label="Total Cost"
                type="number"
                inputProps={inputProps}
                fullWidth
                onChange={this.handleChangeAmount}
              />
              <TextField
                autoFocus
                value={this.state.people}
                margin="dense"
                id="standard-required"
                label="Total people"
                type="number"
                fullWidth
                onChange={this.handleChangePeople}
              />
              </DialogContent>
            {/*<DialogTitle id="confirmation-dialog-title">
              Activity Type
            </DialogTitle>
            <DialogContent>
              <DialogContentText>Activity Type</DialogContentText>
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
                  <FormControlLabel
                    value={option}
                    key={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
              <Button onClick={this.handleClose} color="primary">
                Add a picture of receipt
              </Button>
            </DialogContent>*/}
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

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

// export default Home;
export default withRoot(withStyles(styles)(Home));
