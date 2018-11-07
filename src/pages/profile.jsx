import React from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ActivityList from "../Components/ActivityList.jsx";
import AppBar from "../Components/AppBar.jsx";


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

			<div>
			<AppBar />
			<ActivityList type={"history"}/>
			{/*<Button onClick={this.test}>{this.state.count}</Button>*/}		
			</div>
		);
	}
}

export default Profile;
