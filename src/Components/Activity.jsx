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
import AppBar from "../Components/AppBar.jsx";


function calculateOwed(data){
		var i;
		var val=0;
		var arr= data.participants;
		for (i = 0; i < arr.length; i++) {
			if(parseInt(arr[i].paid) == 0){
    			val += parseFloat(arr[i].amount);
    		}
		} 
		return val.toFixed(2);
}

function calculatePaid(data){
		var i;
		var val=0;
		var arr= data.participants;
		for (i = 0; i < arr.length; i++) {
			if(parseInt(arr[i].paid) == 1){
    			val += parseFloat(arr[i].amount);
    		}
		} 
		return val.toFixed(2);
}

class Activity extends React.Component {
	state = {
		remindOpen: false,
		payOpen: false,
		descriptionOpen: false
	};

	handleClickPay = () => {
		this.setState({ payOpen: true});
		if(this.state.descriptionOpen){
			this.setState({descriptionOpen:false });
		}
	};

	handleClosePay = () => {
		this.setState({ payOpen: false });
	};

	handleClickRemind = () => {
		this.setState({ remindOpen: true});
		if(this.state.descriptionOpen){
			this.setState({descriptionOpen:false });
		}
	};

	handleCloseRemind = () => {
		this.setState({ remindOpen: false });
	};

	handleClickDescription = () => {
		this.setState({ descriptionOpen: true });
	};

	handleCloseDescription = () => {
		this.setState({ descriptionOpen: false });
	};

	handlePay = (index) => {
		console.log("handlePay");
		this.setState({ payOpen: false });
		this.props.update(1);
	};

	render() {
		const { payOpen, remindOpen, descriptionOpen } = this.state;
		const data = this.props.data;
		let buttons;
		let title;

		//render pay and remind button if transaction is not complete
		if(data.complete == "0"){
			buttons = parseInt(data.lender) === 0 ? 
							
						<Button
							variant="contained"
							color={"inherit"}
							aria-label="remind"
							onClick={() => this.handleClickRemind()}
						>
						Remind 
						</Button> 
					:					
						<Button
							variant="contained"
							color="secondary"
							aria-label="pay"
							onClick={() => this.handleClickPay()}
						>
						Pay
						</Button>	
		}

		if(data.complete =="0"){
			title = parseInt(data.lender) === 0 ?
					<ListItemText primary={data.title + " - You are owed $"+ calculateOwed(data)} />
				:
					<ListItemText primary={data.title + " - You owe $"+ data.participants[0].amount} />
		} else {
			title = parseInt(data.lender) === 0 ?
					<ListItemText primary={data.title + " - You were paid back $"+ calculatePaid(data)} />
				:
					<ListItemText primary={data.title + " - You paid $"+ data.participants[0].amount} />
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
							src="http://multisim-insigneo.org/wp-content/uploads/2015/02/blank-profile-picture-300x300.png"
						/>
						{title}
						<ListItemSecondaryAction>
						{buttons}
						</ListItemSecondaryAction>
						
					</ListItem>

				<Dialog
					open={this.state.payOpen}
					onClose={this.handleClosePay}
					aria-labelledby="pay-dialog"
				>
					<DialogTitle id="pay-dialog">
						{"Pay "+ data.owner + " $"+calculateOwed(data)+"?"}
					</DialogTitle>
					<DialogActions>
						<Button 
							variant="contained"
							color="secondary"
							onClick={() => this.handlePay(parseInt(data.id))}
						>
						Cash
						</Button>
					</DialogActions>
				</Dialog>

				<Dialog
					open={this.state.remindOpen}
					onClose={this.handleCloseRemind}
					aria-labelledby="remind-dialog"
				>
					<DialogTitle id="remind-dialog">
						Methods to remind Page
					</DialogTitle>
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
					{data.date}: {data.description}
					</DialogContent>
					<DialogActions>
						{buttons}
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default Activity;
