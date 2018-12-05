import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import classNames from 'classnames';
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
import Activity from "./Activity.jsx";

const styles = theme => ({
	top: {
		textAlign: "center",
		paddingTop: theme.spacing.unit * 0
	}
});



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

//Returns incomplete activities
function getActivities() {
	var activities = JSON.parse(sessionStorage.getItem("activities"));
	if (sessionStorage.getItem("called") != "1") {
		activities = activities.list;
	}
	for (var i = 0; i < activities.length; i++) {
		if (!relevantActivity(activities[i])) {
			activities.splice(i, 1);
			i--;
		}
	}
	activities = activities.filter(item => item.complete === "0");

	return activities;
}

//returns if currentUser is involved in active activity
function relevantActivity(activity) {
	var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

	if (currentUser.name == activity.owner) {
		return true;
	}

	var participants = activity.participants;
	for (var i = 0; i < participants.length; i++) {
		if (
			participants[i].name == currentUser.name &&
			participants[i].paid == "0"
		) {
			console.log("Fuggit");
			return true;
		}
	}
	return false;
}

//returns if currentUser is involved in any activity
function relevantHistory(activity) {
	var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

	if (currentUser.name == activity.owner) {
		return true;
	}

	var participants = activity.participants;
	for (var i = 0; i < participants.length; i++) {
		if (participants[i].name == currentUser.name) {
			return true;
		}
	}
	return false;
}

function ifOwner(activity) {
	var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

	if (activity.owner == currentUser.name) {
		return true;
	}
}

//Returns all activities
function getHistory() {
	var history = JSON.parse(sessionStorage.getItem("activities"));
	if (sessionStorage.getItem("called") != "1") {
		history = history.list;
	}

	for (var i = 0; i < history.length; i++) {
		
		if (!relevantHistory(history[i])) {
			history.splice(i, 1);
			i--;
		}
	}

	return history;
}

function getAllHistory() {
	var history = JSON.parse(sessionStorage.getItem("activities"));
	if (sessionStorage.getItem("called") != "1") {
		history = history.list;
	}
	return history;
}

function updatePayment(index) {

	var activities = getAllHistory();
	
	var activity = activities[index - 1];
	var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
	var participants = activity.participants;

	for (var i = 0; i < participants.length; i++) {
		if (participants[i].name == currentUser.name) {
			participants[i].paid = "1";
			break;
		}
	}

	activity.participants = participants;

	for (var i = 0; i < participants.length; i++) {
		if (participants[i].paid == "0") {
			break;
		}

		if (i + 1 == participants.length) {
			activity.complete = "1";
		}
	}



	activities[index - 1] = activity;

	return activities;
}

class ActivityList extends React.Component {
	state = {
		paid: false,
	};
	handleCloseConfirmationSnack = (event, reason) => {
	    if (reason === 'clickaway') {
	      return;
	    }

	    this.setState({ paid: false});
	};

	handleConfirmationSnack = () => {
	    this.setState({ paid: true});
	};

	//UpdateList called by child when completing payment
	updateList = index => {

		var newActivities = updatePayment(index);
		sessionStorage.setItem("activities", JSON.stringify(newActivities));
		this.setState({paid: true});
		sessionStorage.setItem("called", "1");
	};

	render() {
		const { classes } = this.props;
		const { value, ...other } = this.props;
		const items = getActivities();
		const history = getHistory();
		return (
			<div>
				<div className={classes.top}>
					{this.props.type == "active" ? (
						<List>
							{items.map(item => (
								<Activity
									data={item}
									update={this.updateList}
								/>
							))}
						</List>
					) : (
						<List>
							{history.map(item => (
								<Activity
									data={item}
									update={this.updateList}
								/>
							))}
						</List>
					)}
				</div>
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
			</div>
		);
	}
}

ActivityList.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(ActivityList));
