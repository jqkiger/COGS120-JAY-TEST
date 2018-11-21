import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import withRoot from "../withRoot";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

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

  render() {
    const friends = getFriends();

    return (
      <div>
       {friends.map((list) => {
       return (
       <List key={list.id} subheader={<ListSubheader>{list.name}</ListSubheader>}>
      </List>
      )
      })}</div>)

  }
}

export default withRoot(withStyles(styles)(FriendsList));
