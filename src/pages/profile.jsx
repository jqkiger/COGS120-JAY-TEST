import React from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ActivityList from "../Components/ActivityList.jsx";
import AppBar from "../Components/AppBar.jsx";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import Avatar from "@material-ui/core/Avatar";
import Grid from '@material-ui/core/Grid';




const styles = theme => ({
  top: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 0
  },
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100,
  },
});

class Profile extends React.Component{
	state = {
    count: parseInt(sessionStorage.getItem('count'))
  	};

  	test = () => {
  		this.setState({count: this.state.count + 1});
  		sessionStorage.setItem('count', this.state.count+1);
  	};

	render(){
		const { classes } = this.props;
		return(

			<div className={classes.top}>
			<AppBar />
      <div>
      <Grid container justify="center" alignItems="center">
      {console.log(JSON.parse(sessionStorage.getItem("currentUser")).pic)}
      <Avatar alt="Remy Sharp" src={JSON.parse(sessionStorage.getItem("currentUser")).pic} className={classes.bigAvatar} />
      </Grid>
			<Typography component="h6" variant="h6" className={classes.top}>
        		Name : {JSON.parse(sessionStorage.getItem("currentUser")).name}
      </Typography>
      <Typography component="h6" variant="h6" className={classes.top}>
            Number : {JSON.parse(sessionStorage.getItem("currentUser")).number}
      </Typography>
      <Typography component="h6" variant="h6" className={classes.top}>
            Email : {JSON.parse(sessionStorage.getItem("currentUser")).email}
      </Typography>
      </div>
      <Divider variant="middle" />
			<ActivityList type={"history"}/>
			{/*<Button onClick={this.test}>{this.state.count}</Button>*/}		
			</div>
		);
	}
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
