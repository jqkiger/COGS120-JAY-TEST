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
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Toolbar from '@material-ui/core/Toolbar';





import AddAPhoto from "@material-ui/icons/AddAPhoto";
import AddIcon from "@material-ui/icons/Add";
import withRoot from "../withRoot";
import AppBar from "../Components/AppBar.jsx";
import ActivityList from "../Components/ActivityList.jsx";
import CloseIcon from '@material-ui/icons/Close';


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
  },
  dialogT:{
    minHeight: '80vh',
    maxHeight: '80vh',
  },
   root: {
    flexGrow: 1,
    textAlign: "center",
  },
  closeButton: {
    marginTop: -75,
    marginRight: -60
  },
  formControl: {
    margin: 0,
    fullWidth: false,
    wrap: 'nowrap'
  },
});


const inputProps = {
  step: 0.01,
  startAdornment: <InputAdornment position="start">$</InputAdornment>
};

const options = ["Food", "Recreation", "Shopping", "Bills", "Other"];

const temp = []

function getFriends(){
	var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
	console.log(currentUser.friends);
	var friends = currentUser.friends;
  return friends;
}

  //Returns all activities
function getHistory(){
    var history = JSON.parse(sessionStorage.getItem('activities'));
    if(sessionStorage.getItem('called') != "1"){
      history = history.list;
    }
    console.log("Get History");
    console.log(history);
    return history;
}

class Home extends React.Component {
  state = {
    open: false,
    pageTwoOpen: false,
    confirmationOpen: false,
    description: "",
    checked: [],
    title: "",
    charges: [],
    ownerPay: 0,
    sum: 0

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
    this.setState({ 
      open: false, 
      pageTwoOpen: false, 
      confirmationOpen: false,
      description: "",
      checked: [],
      amount: '',
      title: "",
      people: '',
      charges:[],
      ownerPay: 0,
      sum: 0
    });
  };

  handleOk = () => {
    console.log(this.state.people);
    var amnt = parseFloat(this.state.amount);
    console.log(amnt);
    if( !isNaN(amnt) && this.state.title != ""){
      this.setState({ open: false, pageTwoOpen: true });
    }
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleConfirmation = () => {
    this.setState({ confirmationOpen: true, pageTwoOpen: false });
    var charge = this.calculateCharge();
    const {charges} = this.state;
    var newCharges = [...charges]
    for (var i=0; i<this.state.people; i++){
      newCharges[i] = charge
    }
    this.setState({charges: newCharges, ownerPay:charge})
  };

  handleCreateActivity = () => {
    var sum = 0
    for(var i=0; i<this.state.people;i++){
      sum += parseFloat(this.state.charges[i])
    }
    sum = sum + parseFloat(this.state.ownerPay)
    console.log("sum")
    console.log(sum)
    if(sum === parseFloat(this.state.amount)){
      this.updateData();
      this.handleCancel();
    }
  };

  handleChangeDescription = (event) => {
    this.setState({ description: event.target.value });    
  };

  handleChangeTitle = (event) => {
    this.setState({ title: event.target.value });    
  };

  handleChangeAmount = (event) => {
    this.setState({ amount:event.target.value });
    console.log(this.state.amount);
  };

  handleChangePeople = (event) => {
    this.setState({ people: event.target.value });
  };

  handleChangeOwnerPay = (event) => {
    this.setState({ ownerPay: event.target.value });
  };

  handleChangeCharge =(n, event) => {
    var ind = n.id-1
    const {charges} = this.state;
    const newCharges = [...charges]
    newCharges[ind] = parseFloat(event.target.value);
    this.setState({charges: newCharges})
    console.log(this.state.charges)
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
      people: newChecked.length
    });
  };

  handleBack = () => {
    if(this.state.pageTwoOpen){
      this.setState({ 
        open: true, 
        pageTwoOpen: false, 
      });
    }
    else if(this.state.confirmationOpen){
      this.setState({ 
        pageTwoOpen: true , 
        confirmationOpen: false, 
      });
    }
  };

  getSum(){
    var sum = 0
    for(var i=0; i<this.state.people;i++){
      sum += parseFloat(this.state.charges[i])
    }
    sum = sum + parseFloat(this.state.ownerPay)
    return sum
  }
 

  calculateCharge(){
    var total = parseFloat(this.state.amount);
    var totalPeople = parseFloat(this.state.people)+1.0;
    return (total/totalPeople).toFixed(2);
  }

  getPeopleAdded(){
    var peopleList = [];
    var friends = getFriends();
    if(!this.state.confirmationOpen){
      return peopleList;
    }
    //console.log(friends);
    //console.log(this.state.checked);
    //console.log(friends[0].name)
    for(var i=0; i<this.state.people;i++){
      var ind = this.state.checked[i];
      var fname = friends[ind-1].name;
      var charge = this.state.charges[i]
      peopleList.push({id:(i+1), name:fname, amount: charge, paid: "0"})
    }
    console.log(peopleList);
    return peopleList;
  }

  updateData(){
    var activities = getHistory(); 
    var peopleList = this.getPeopleAdded();  
    console.log("Create new Listing")
    console.log(activities.length)
    var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    var data = { id: activities.length+1,
                title: this.state.title,
                date: "11/7/2018",
                description: this.state.description,
                lender: "0",
                total: this.state.amount,
                owner: currentUser.name,
                complete: "0",
                participants: peopleList
            }
    console.log(data)
    activities.push(data);
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
      title,
      charges,
    } = this.state;
    const friends = getFriends();
    return (
      <div>
      <AppBar/>
        <Dialog
          fullWidth={true}
          maxWidth= 'sm'
          open={this.state.pageTwoOpen}
          onClose={this.handleCancel}
          aria-labelledby="add-people-dialog"
        >
          <DialogTitle id="form-dialog-title">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.root}>
                Add people to split activity Page
              </Typography>
              <Button className={classes.closeButton}color="inherit" onClick={this.handleCancel} aria-label="Close">
                X
              </Button>
            </Toolbar>
          </DialogTitle>
          
          <DialogContent>
          <List dense>
          {friends.map(value => (
            <ListItem key={value} >
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
            <Button onClick={this.handleBack} color="primary">
              Back
            </Button>
            <Button onClick={this.handleConfirmation} color="primary">
              Next
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          maxWidth= 'sm'
          scroll={'body'}
          open={this.state.confirmationOpen}
          onClose={this.handleCancel}
          aria-labelledby="confirmation-dialog"
        >
          <DialogTitle id="form-dialog-title">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.root}>
                Confirmation split activity Page
              </Typography>
              <Button className={classes.closeButton}color="inherit" onClick={this.handleCancel} aria-label="Close">
                X
              </Button>
            </Toolbar>
          </DialogTitle>
          <DialogContent>
          <List dense>
          {this.getPeopleAdded().map( n=> (
            <ListItem key={n} >
              <Avatar alt="Remy Sharp" src="http://multisim-insigneo.org/wp-content/uploads/2015/02/blank-profile-picture-300x300.png" />            
              <ListItemText primary={n.name +" is being charged "} />
              <FormControl className={classes.formControl}>
                <Input
                  type="number"
                  style={{width:50}}
                  id="adornment-amount"
                  value={this.state.charges[n.id-1]}
                  onChange={(event) =>this.handleChangeCharge(n, event)}
                  inputProps={inputProps}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
              </FormControl>
            </ListItem>
          ))}
            <ListItem>
              <Avatar alt="Remy Sharp" src="http://multisim-insigneo.org/wp-content/uploads/2015/02/blank-profile-picture-300x300.png" />            
              <ListItemText>You will be paying </ListItemText>
              <FormControl className={classes.formControl} >
                <Input
                  type="number"
                  style={{width:50}}
                  id="adornment-amount"
                  value={this.state.ownerPay}
                  onChange={this.handleChangeOwnerPay}
                  inputProps={inputProps}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
              </FormControl>
            </ListItem>
          </List>
          </DialogContent>
          <DialogContentText>
                Total amount ${this.getSum()} of ${parseFloat(this.state.amount)}
          </DialogContentText>
          <DialogActions>
             <Button onClick={this.handleBack} color="primary">
              Back
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
            
            maxWidth= 'sm'
            scroll={'body'}
            open={this.state.open}
            onClose={this.handleCancel}
            aria-labelledby="form-dialog-title"
          >
          <DialogTitle id="form-dialog-title">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.root}>
                Create Split Activity
              </Typography>
              <Button className={classes.closeButton}color="inherit" onClick={this.handleCancel} aria-label="Close">
                X
              </Button>
            </Toolbar>
          </DialogTitle>
            <DialogContent>
              <DialogContentText>
                To split a purchase please enter a description, the total cost,
                and the number of people involved (excluding yourself).
              </DialogContentText>
              <TextField
                autoFocus
                value={this.state.title}
                margin="dense"
                id="standard-required"
                label="Title of purchase *"
                type="text"
                fullWidth
                onChange={this.handleChangeTitle}
              />
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
              <FormControl fullWidth>
                <InputLabel  htmlFor="adornment-amount">Amount*</InputLabel>
                <Input
                  type="number"

                  id="adornment-amount"
                  value={this.state.amount}
                  onChange={this.handleChangeAmount}
                  inputProps={inputProps}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
              </FormControl>
              {/*<TextField
                autoFocus
                value={this.state.people}
                margin="dense"
                id="standard-required"
                label="Number of other people"
                type="number"
                fullWidth
                onChange={this.handleChangePeople}
              />*/}
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
            <DialogActions >
              <Button onClick={this.handleCancel} color="primary">
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
