import React from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';
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
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';



import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from "@material-ui/core/IconButton";
import AddAPhoto from "@material-ui/icons/AddAPhoto";
import AddIcon from "@material-ui/icons/Add";
import withRoot from "../withRoot";
import AppBar from "../Components/AppBar.jsx";
import blue from '@material-ui/core/colors/blue';


const theme = createMuiTheme({
	overrides: {
		MuiButton: {
			root: {
				background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
			},
		},
	},
});

const theme2 = createMuiTheme({
	overrides: {
		MuiButton: {
			root: {
        border: 0,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
				color: 'red',
			},
		},
	},
});

function calculateOwed(data) {
	var i;
	var val = 0;
	var arr = data.participants;
	for (i = 0; i < arr.length; i++) {
		if (parseInt(arr[i].paid) == "0") {
			val += parseFloat(arr[i].amount);
		}
	}
	return val.toFixed(2);
}


function calculatePay(data){
	var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
	var arr = data.participants;
	for(var i =0; i<arr.length;i++){
		if(arr[i].name === currentUser.name){
			return arr[i].amount;
		} 
	}
}

function calculatePaid(data) {
	var i;
	var val = 0;
	var arr = data.participants;
	for (i = 0; i < arr.length; i++) {
		if (parseInt(arr[i].paid) == "1") {
			val += parseFloat(arr[i].amount);
		}
	}
	return val.toFixed(2);
}



const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
classes: PropTypes.object.isRequired,
className: PropTypes.string,
message: PropTypes.node,
onClose: PropTypes.func,
variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};
const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

class Activity extends React.Component {
	state = {
		remindOpen: false,
		payOpen: false,
		descriptionOpen: false,
		paid: false,
		reminded: false
	};

	handleCloseConfirmationSnack = (event, reason) => {
	    if (reason === 'clickaway') {
	      return;
	    }

	    this.setState({ paid: false , reminded: false,});
	};

	handleConfirmationSnack = () => {
	    this.setState({ paid: true, reminded: true,  });
	};

	handleClickPay = () => {
		this.setState({ payOpen: true });
		if (this.state.descriptionOpen) {
			this.setState({ descriptionOpen: false });
		}
	};

	handleClosePay = () => {
		this.setState({ payOpen: false });
	};

	handleClickRemind = () => {
		this.setState({ remindOpen: true });
		if (this.state.descriptionOpen) {
			this.setState({ descriptionOpen: false });
		}
	};

	handleCloseRemind = () => {
		this.setState({ remindOpen: false, reminded: true });
	};

	handleClickDescription = () => {
		this.setState({ descriptionOpen: true });
	};

	handleCloseDescription = () => {
		this.setState({ descriptionOpen: false });
	};

	handlePay = index => {
		this.setState({paid: true})
		console.log("handlePay");
		console.log(this.props.data.id);
		this.setState({ payOpen: false });
		
		this.props.update(index);
	};

	getDebtors = () =>{
		var list = [];
		var participants = this.props.data.participants;
		for( var i=0; i<(participants.length);i++){
			if(participants[i].paid == "0"){
				list.push(participants[i]);
			}
		}
		return list;
	};

	isOwner = () =>{
		var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
		if(this.props.data.owner == currentUser.name){
			return true;
		}
		return false;
	};


	isNotComplete = () =>{
		if(this.isOwner()){
			if(this.props.data.complete == "0"){
				return true;
			}
		}
		else{
			var participants = this.props.data.participants;
			var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
			for( var i=0; i<(participants.length);i++){
				if(participants[i].name == currentUser.name){
					if(participants[i].paid == "1"){return false;}
					return true;
				}
		}
		}
	};

	parseDebtors = () =>{
		var participants = this.props.data.participants;
		var str = ""
		for( var i=0; i<(participants.length);i++){
			if(i+1 == participants.length){
				str = str + participants[i].name;
			}
			else{
				str = str + participants[i].name + ",";
			}
		}
		return str;
	}

	getPic = name =>{
		var users = JSON.parse(sessionStorage.getItem('users'));

		var index = 0
  		for (var i=0; i<users.length;i++){
  			if(users[i].name === name){
  				index = i
  				break;
  			}
  		}
  		return  users[index].pic;
	}

	render() {
		const { classes } = this.props;
		const { payOpen, remindOpen, descriptionOpen} = this.state;
		const data = this.props.data;
		let buttons;
		let title;
		const debtors = this.getDebtors();


		//render pay and remind button if transaction is not complete
		if (this.isNotComplete()) {
			buttons =
				this.isOwner() ? (
          <MuiThemeProvider theme={theme}>
            <Button
              variant="contained"
              aria-label="remind"
              onClick={() => this.handleClickRemind()}
            >
              Remind
            </Button>
					</MuiThemeProvider>
				) : (

					<MuiThemeProvider theme={theme2}>
            <Button
              variant="contained"
              color="primary"
              aria-label="pay"
              onClick={() => this.handleClickPay()}
            >
              Pay
            </Button>
					</MuiThemeProvider>
				);
		}

		if (this.isNotComplete()) {
			title =
				this.isOwner() ? (
					<ListItemText
						primary={
							data.title +
							" - You are owed $" +
							calculateOwed(data)
						}
					/>
				) : (
					<ListItemText
						primary={
							data.title +
							" - You owe "+ data.owner +" $" +
							calculatePay(data)
						}
					/>
				);
		} else {
			title =
				this.isOwner() ? (
					<ListItemText
						primary={
							data.title +
							" - You were paid back $" +
							calculatePaid(data)
						}
					/>
				) : (
					<ListItemText
						primary={
							data.title +
							" - You paid "+ data.owner +" $" +
							calculatePay(data)
						}
					/>
				);
		}

		return (
			<div>
				<ListItem
					dense
					button
					onClick={() => this.handleClickDescription()}
				>
					<Avatar
						alt="Remy Sharp"
						src={this.getPic(data.owner)}
					/>
					{title}
					<ListItemSecondaryAction>{buttons}</ListItemSecondaryAction>
				</ListItem>

				<Dialog
					open={this.state.payOpen}
					onClose={this.handleClosePay}
					aria-labelledby="pay-dialog"
				>
					<DialogTitle id="pay-dialog">
						{"Pay " + data.owner + " $" + calculatePay(data) + "?"}
					</DialogTitle>
					<DialogActions>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => this.handlePay(parseInt(data.id))}
						>
							Cash
						</Button>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => this.handlePay(parseInt(data.id))}
						>
							Venmo
						</Button>
					</DialogActions>
				</Dialog>

				<Dialog
					open={this.state.remindOpen}
					onClose={this.handleCloseRemind}
					aria-labelledby="remind-dialog"
				>
					<DialogTitle id="form-dialog-title" style={{margin: 0}}>
			            <Toolbar style={{margin: 0}}>
			              <Typography variant="h6" color="inherit" style={{flexGrow: 1, textAlign: "center", margin: 0}}>
			                Select users to remind
			              </Typography>
			              <Button style={{marginTop: -75, marginRight: -60}} color="inherit" onClick={this.handleCloseRemind} aria-label="Close">
			                X
			              </Button>
			            </Toolbar>
			         </DialogTitle>
					<DialogContent>
						<DialogContent>
							<List dense = {true}>
								{debtors.map(value => (
									<ListItem key={value}>
										<Avatar
											alt="Remy Sharp"
											src={this. getPic(value.name)}
										/>
										{console.log("RAA")}
										{console.log(value)}
										<ListItemText primary={value.name + " owes $" + value.amount}/>
										
											<Button
												variant = "contained"
												color ="inherit"
												size = "small"
												onClick={this.handleCloseRemind}>
												Send Reminder
											</Button>
									</ListItem>
								))}
							</List>
						</DialogContent>
					</DialogContent>
				</Dialog>

				<Dialog
					open={this.state.descriptionOpen}
					onClose={this.handleCloseDescription}
					aria-labelledby="description-dialog"
				>
					<DialogTitle id="description-dialog">
						{data.title}
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
              				Lender: {data.owner}
            			</DialogContentText>
            			<DialogContentText>
              				Debtors: {this.parseDebtors()}
            			</DialogContentText>
						<DialogContentText>
              				{data.date}: {data.description}
            			</DialogContentText>
						
					</DialogContent>
					<DialogActions>{buttons}</DialogActions>
				</Dialog>
			<Snackbar
	          anchorOrigin={{
	            vertical: 'bottom',
	            horizontal: 'left',
	          }}
	          open={this.state.paid}
	          autoHideDuration={5000}
	          onClose={this.handleCloseConfirmationSnack}
	        >
	          <MySnackbarContentWrapper
	            onClose={this.handleCloseConfirmationSnack}
	            variant="success"
	            message="Successfully Paid!"
	          />
	        </Snackbar>

	        <Snackbar
	          anchorOrigin={{
	            vertical: 'bottom',
	            horizontal: 'left',
	          }}
	          open={this.state.reminded}
	          autoHideDuration={5000}
	          onClose={this.handleCloseConfirmationSnack}
	        >
	          <MySnackbarContentWrapper
	            onClose={this.handleCloseConfirmationSnack}
	            variant="success"
	            message="Reminder Sent!"
	          />
	        </Snackbar>
			</div>
		);
	}
}

export default Activity;
