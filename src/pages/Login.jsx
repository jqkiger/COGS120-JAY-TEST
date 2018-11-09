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
import Input from '@material-ui/core/Input';

import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Group from "@material-ui/icons/Group";


const styles = theme =>( {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    textAlign: "center"

  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  list: {
    width: 170
  },
  button: {
    margin: theme.spacing.unit,
    bottom: "auto",
  },
  input: {
    margin: theme.spacing.unit,
  },
   container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});


class Login extends React.Component{
  state = {
    };


  render(){
    const { classes } = this.props;

    return(
      <div>
      <div className={classes.root}>
        <AppBar position="static" title ="Splitmo" >
          <Toolbar>
            <Button
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            />              
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Splitmo
              </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Typography className={classes.grow}>
        <Input
          defaultValue="Email"
          className={classes.input}
        />
      </Typography>

      <Typography className={classes.grow}>
        <Input
          defaultValue="Password"
          className={classes.input}
        />
      </Typography>

      <Typography variant="h6" color="inherit" className={classes.grow}>
        <Button
          className={classes.button}
          variant="contained"
          component={Link} to ="/Home"
          color="primary"  
        >
         Login
        </Button>
      </Typography>
      
      </div>
    );
  }
}

export default withStyles(styles)(Login);