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
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
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


class Activity extends React.Component {
	state = {
		remindOpen: false,
		payOpen: false,
		descriptionOpen: false
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
		this.setState({ remindOpen: false });
	};

	handleClickDescription = () => {
		this.setState({ descriptionOpen: true });
	};

	handleCloseDescription = () => {
		this.setState({ descriptionOpen: false });
	};

	handlePay = index => {
		console.log("handlePay");
		console.log(this.props.data.id);
		this.setState({ payOpen: false });
		this.props.update(index);
	};

	getDebtors = () =>{
		var list = [];
		var participants = this.props.data.participants;
		console.log(participants);
		for( var i=0; i<(participants.length);i++){
			if(participants[i].paid == "0"){
				list.push(participants[i]);
			}
		}
		console.log("FUCK");
		console.log(list);
		return list;
	};

	isOwner = () =>{
		var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
		console.log("I am hungry");
		console.log(currentUser.name);
		if(this.props.data.owner == currentUser.name){
			return true;
		}
	};

	render() {
		const { payOpen, remindOpen, descriptionOpen } = this.state;
		const data = this.props.data;
		let buttons;
		let title;
		const debtors = this.getDebtors();

		//render pay and remind button if transaction is not complete
		if (data.complete == "0") {
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

		if (data.complete == "0") {
			title =
				parseInt(data.lender) === 0 ? (
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
							" - You owe $" +
							data.participants[0].amount
						}
					/>
				);
		} else {
			title =
				parseInt(data.lender) === 0 ? (
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
							" - You paid $" +
							data.participants[0].amount
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
						src="http://multisim-insigneo.org/wp-content/uploads/2015/02/blank-profile-picture-300x300.png"
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
						{"Pay " + data.owner + " $" + calculateOwed(data) + "?"}
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
					<DialogTitle id="remind-dialog">
						Select the users  you need to remind to remind
					</DialogTitle>
					<DialogContent>
						<DialogContent>
							<List dense>
								{debtors.map(value => (
									<ListItem key={value} button>
										<Avatar
											alt="Remy Sharp"
											src="http://multisim-insigneo.org/wp-content/uploads/2015/02/blank-profile-picture-300x300.png"
										/>
										<ListItemText primary={value.name}>
										</ListItemText>
										<ListItemSecondaryAction>
											<Button
												variant = "contained"
												color ="inherit"
												onClick={this.handleCloseRemind}>
												Send Reminder
											</Button>
										</ListItemSecondaryAction>
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
						{data.date}: {data.description}
					</DialogContent>
					<DialogActions>{buttons}</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default Activity;
