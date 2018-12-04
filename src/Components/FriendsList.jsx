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
              src="http://multisim-insigneo.org/wp-content/uploads/2015/02/blank-profile-picture-300x300.png"
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


