import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountCircle from '@material-ui/icons/AccountCircle';
import Group from '@material-ui/icons/Group';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list:{
    width: 250,
  }
};



class ButtonAppBar extends React.Component {
  state = { 
    isDrawerOpen: false,
    isNotificationsDrawerOpen: false,
  };

  toggleDrawer = (side, open)=>()=>{
    this.setState({
      [side]: open
    });
  };

  handleFriendsClick = () => {
    
  };

    handleClickProfile=()=>{
      this.setState({profileOpen: true,});
    };
    
    handleClickFriends=()=>{
      this.setState({friendsOpen: true,});
    };

    handleCloseProfile=()=>{
      this.setState({profileOpen: false,});
    };

    handleCloseFriends=()=>{
      this.setState({friendsOpen: false,});
    };

  render(){
    const{classes} = this.props;
    const{profileOpen} = this.state;
    const{friendsOpen} = this.state;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button onClick={() => this.handleClickProfile()}>
            <ListItemIcon><AccountCircle/></ListItemIcon>
            <ListItemText primary="Profile"/>
          </ListItem>

          <ListItem button onClick={() => this.handleClickFriends()}>
            <ListItemIcon><Group/></ListItemIcon>
            <ListItemText primary="Friends"/>
          </ListItem>
          
        </List>
      </div>
    );

    const AlertList = (
     <div className={classes.list}>
        <List>
          {['You owe Friend1 Money', 'Friend2 owes you money'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 ===0 ? <Group/>:<Group/>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );


    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>

            <Button 
              className={classes.menuButton} 
              color="inherit" 
              aria-label="Open drawer"
              onClick={this.toggleDrawer('left', true)}
              >
              <MenuIcon />
            </Button>

            <Drawer anchor="left" open={this.state.left} onClose={this.toggleDrawer('left', false)}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('left', false)}
                onKeyDown={this.toggleDrawer('left', false)}
              >
                {sideList}
              </div>
            </Drawer>

            <div>
              <Dialog
                      open={this.state.profileOpen}
                      onClose={this.handleCloseProfile}
                      aria-labelledby="profile-dialog"
                    >
                      <DialogTitle id="profile-dialog">Profile Page</DialogTitle>
              </Dialog>
              <Dialog
                      open={this.state.friendsOpen}
                      onClose={this.handleCloseFriends}
                      aria-labelledby="friend-dialog"
                    >
                      <DialogTitle id="friend-dialog">Friend/Social Page</DialogTitle>
              </Dialog>
            </div>

            <Typography variant="h6" color="inherit" className={classes.grow}>
              Splitmo
            </Typography>
            {/*<IconButton color="inherit">
              <Badge badgeContent={2} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>*/}
          </Toolbar>
        </AppBar>
      </div>
    );
  };
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);