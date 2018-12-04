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
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';



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
    uname: '',
    pw: '',
    invalid: false,
    showPassword: false
  };

  handleChange = name => event =>{
    this.setState({
      [name]: event.target.value
    });
    console.log(this.state.uname);
    console.log(this.state.pw);
  }; 

  handleCloseInvalid = () => {
    this.setState({ invalid: false });
  };

  handleOpenInvalid = () => {
    this.setState({ invalid: true });
  };

  checkCredentials = () => {
    var users = JSON.parse(sessionStorage.getItem('users'));
    for(var i=0; i<users.length;i++){
      console.log(users[i]);
      if(users[i].u == this.state.uname && users[i].pw == this.state.pw){
        sessionStorage.setItem('currentUser', JSON.stringify(users[i]))
        return true;
      }
    }
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };




  render(){
    const { classes } = this.props;

    const incorrectLogin = (
      <div>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          <Link to="/Home" onClick={(event) => event.preventDefault()}>
            <Button
              className={classes.button}
              variant="contained"
              onClick={() => this.handleOpenInvalid()}
              color="primary"  
            >
             Login
            </Button>
          </Link>
        </Typography>
      </div>
    );

    const correctLogin = (
      <div>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          <Link to="/Home">
            <Button
              className={classes.button}
              variant="contained"
              
              color="primary"  
            >
             Login
            </Button>
          </Link>
        </Typography>
      </div>
    );



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

        <Typography variant="h6" color="inherit" className={classes.grow}>
          <FormControl className={classes.grow}>


            <InputLabel htmlFor="adornment-username">Username</InputLabel>
            <Input
              id="adornment-username"
              value={this.state.uname}
              onChange={this.handleChange('uname')}
            />
          </FormControl>
        </Typography>

        <Typography variant="h6" color="inherit" className={classes.grow}>
          <FormControl className={classes.grow}>
            <InputLabel htmlFor="adornment-password">Password </InputLabel>
            <Input
              id="adornment-password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.pw}
              onChange={this.handleChange('pw')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Typography>


        {this.checkCredentials() ? correctLogin : incorrectLogin}
      
        <Dialog
          open={this.state.invalid}
          onClose={this.handleCloseInvalid}
          aria-labelledby="description-dialog"
        >
          <DialogTitle id="description-dialog">
            Incorrect username or password
          </DialogTitle>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
