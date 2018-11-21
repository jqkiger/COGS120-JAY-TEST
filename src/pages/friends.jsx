import React from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField'
import AppBar from "../Components/AppBar.jsx";
// import AutoComplete from '@material-ui/AutoComplete';


class Friends extends React.Component {

  render() {
    return(

			<div>
  			<AppBar />
  			<TextField/>
			</div>
		);
  }
}

export default Friends;
