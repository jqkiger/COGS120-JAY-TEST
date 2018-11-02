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

  render(){
    const{classes} = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button onClick={() => this.handleFriendsClick()}>
            <ListItemIcon><AccountCircle/></ListItemIcon>
            <ListItemText primary="Profile"/>
          </ListItem>

          <ListItem button >
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