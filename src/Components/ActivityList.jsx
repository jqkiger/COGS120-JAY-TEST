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

import AddAPhoto from "@material-ui/icons/AddAPhoto";
import AddIcon from "@material-ui/icons/Add";
import withRoot from "../withRoot";
import Activity from "./Activity.jsx"

const styles = theme => ({
  top: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 0
  }
});

//Returns incomplete activities
function getActivities(){
	var activities = JSON.parse(sessionStorage.getItem('activities'));
	if(sessionStorage.getItem('called') != "1"){
		activities = activities.list;
	}
	activities = activities.filter(item => item.complete === "0");
	return activities;

}

//Returns all activities
function getHistory(){
	var history = JSON.parse(sessionStorage.getItem('activities'));
	if(sessionStorage.getItem('called') != "1"){
		history = history.list;
	}
	return history;
}




class ActivityList extends React.Component {
	state={

	};

	//UpdateList called by child when completing payment
	updateList = (index) =>{
		console.log("updateList");
		var activities = getHistory();
		console.log(activities);
		activities[index-1].complete = "1";
      	sessionStorage.setItem('activities', JSON.stringify(activities));
      	activities = JSON.parse(sessionStorage.getItem('activities'));
		this.setState(this.state);
		console.log(activities);
		console.log("updateList done");
		sessionStorage.setItem('called', "1");

	};

	render(){
		const { classes } = this.props;
		const { value, ...other } = this.props;
		const items = getActivities();
		const history = getHistory();
		return(
			<div>
				<div className={classes.top}>
					{this.props.type == "active" ?
		          		<List>{items.map(item =>(<Activity data={item} update={this.updateList}/>))}</List>
		          	:
		          		<List>{history.map(item =>(<Activity data={item} update={this.updateList}/>))}</List>
		          	}
		        </div>
	        </div>
		);

	}
}

ActivityList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(ActivityList));
