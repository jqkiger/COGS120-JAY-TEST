import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import withRoot from "../withRoot";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";


import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	top: {
		textAlign: "center",
    paddingTop: theme.spacing.unit * 0
	}
});

function getFriends() {
  var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  return currentUser.friends;
}

class FriendsList extends React.Component {

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
    const friends = getFriends();

    return (
      <div className={classes.top}>
      <List >
        {friends.map(value => (
          <ListItem key={value}>
            <Avatar
              alt="Remy Sharp"
              src={this.getPic(value.name)}
            />
            <ListItemText primary={value.name}/>
          </ListItem>
        ))}
      </List>
      </div>
    )

  }
}

export default withRoot(withStyles(styles)(FriendsList));


