import React from "react";
import { Link, withRouter, NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Group from "@material-ui/icons/Group";
import ExitToApp from "@material-ui/icons/ExitToApp"

const styles = {
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  grow: {
    flexGrow: 1,
    textAlign: "center",

  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  list: {
    width: 170
  }
};

class ButtonAppBar extends React.Component {
  state = {
    isDrawerOpen: false,
    isNotificationsDrawerOpen: false
  };

  toggleDrawer  = (open) => () => {
    this.setState({isDrawerOpen: open});
  };


  handleClickIcon = () => {
    this.setState({isDrawerOpen: !this.state.isDrawerOpen});
  };

  render() {
    const { classes } = this.props;

    const { isDrawerOpen } = this.state;

    const sideList = (
      <div className={classes.list}>
        <MenuList>
            <MenuItem button
              component={Link} to ="/Profile"
              onClick={() => this.handleClickIcon()}>
              <ListItemIcon> <AccountCircle/> </ListItemIcon>
              <ListItemText> Profile </ListItemText>
            </MenuItem>

          <MenuItem button
            component={Link} to ="/Friends"
            onClick={() => this.handleClickFriends()}>
            <ListItemIcon> <Group/> </ListItemIcon>
            <ListItemText> Friends </ListItemText>
          </MenuItem>
          <MenuItem button
            component={Link} to ="/"
            onClick={() => this.handleClickIcon()}>
            <ListItemIcon> <ExitToApp/> </ListItemIcon>
            <ListItemText> Logout </ListItemText>
          </MenuItem>
        </MenuList>
      </div>
    );

    const AlertList = (
      <div className={classes.list}>
        <List>
          {["You owe Friend1 Money", "Friend2 owes you money"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <Group /> : <Group />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" title ="Splitmo" >
          <Toolbar>
            <Button
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={this.toggleDrawer(true)}
            >
              <MenuIcon />
            </Button>

            <Button
              component={Link} to ="/Home"
              color="inherit"
              className={classes.grow}
              disableRipple="true"
              disableTouchRipple="true"
              focusRipple="true"
            >
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Splitmo
              </Typography>
            </Button>

          </Toolbar>
        </AppBar>

        <Drawer
          anchor='left'
          open={this.state.isDrawerOpen}
          onClose={this.toggleDrawer(false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          />
          {sideList}

        </Drawer>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
