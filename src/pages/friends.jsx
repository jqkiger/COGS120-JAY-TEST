import React from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField'
import AppBar from "../Components/AppBar.jsx";
import FriendsList from "../Components/FriendsList.jsx";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";

import AddIcon from "@material-ui/icons/Add";


const styles = theme =>( {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    textAlign: "center"

  },
});


function getNotFriends() {
  var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  var friends = currentUser.friends;
  console.log("RARE")
  console.log(friends)
  var notfriends =[]
  var users = JSON.parse(sessionStorage.getItem('users'));
  console.log(users)
  for(var i=0; i<users.length ; i++){
  	var contains = friends.some(item => item.name === users[i].name)
  	if (!contains && currentUser.name != users[i].name)
  		notfriends.push(users[i])
  }
   console.log("not friends");
  console.log(notfriends)
  return notfriends;
}

class Friends extends React.Component {
	state = {
		add: false,
		toggle: false,
	};

	handleAddFriend = friend  => {
		console.log( JSON.parse(sessionStorage.getItem('users')))
		var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
		var id = currentUser.id
  		var friends = currentUser.friends;
  		var len = friends.length;
  		var users = JSON.parse(sessionStorage.getItem('users'));
  		friends.push({id:(len+1), name:friend});
  		currentUser.friends = friends;
  		users[id-1] = currentUser;
  		sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
  		
  		var index = 0
  		for (var i=0; i<users.length;i++){
  			if(users[i].name === friend){
  				index = i
  				break;
  			}
  		}
  		friends = users[index].friends;
  		len = friends.length;
  		friends.push({id:(len+1), name:currentUser.name});
  		users[index].friends = friends;
  		console.log("Updated");
  		console.log(JSON.stringify(users));

  		sessionStorage.setItem('users', JSON.stringify(users));
  		console.log(JSON.parse(sessionStorage.getItem('users')));
  		this.setState({toggle: !this.state.toggle})
	};

	handleAdd = () => {
		this.setState({ add: true });
	};

	handleCloseAdd = () => {
		this.setState({ add: false });
	};


  render() {
  	const { classes } = this.props;
  	const notfriends = getNotFriends();
    return(

			<div>
  				<AppBar />
        		<FriendsList/>
        		<Typography variant="h6" color="inherit" className={classes.grow}>
        		<Button
        			color= "inherit"
        			variant = "contained"
        			onClick={this.handleAdd}
        		>
        		Add Friend
        		</Button>
        		</Typography>

				<Dialog
						open={this.state.add}
						onClose={this.handleCloseAdd}
				>
				<DialogTitle id="pay-dialog">Add Friends</DialogTitle>
					<DialogContent>
							<List dense = {true}>
								{getNotFriends().map(value => (
									<ListItem key={value}>
										<Avatar
											alt="Remy Sharp"
											src="http://multisim-insigneo.org/wp-content/uploads/2015/02/blank-profile-picture-300x300.png"
										/>
										<ListItemText primary={value.name}/>
										
											<IconButton
												variant = "contained"
												color ="inherit"
												size = "small"
												onClick={() => this.handleAddFriend(value.name)}>
												<AddIcon/>
											</IconButton>
									</ListItem>
								))}
							</List>
					</DialogContent>
				</Dialog>
			</div>
		);
  }
}

export default withStyles(styles)(Friends);
