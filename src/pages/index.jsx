import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";

import AddAPhoto from "@material-ui/icons/AddAPhoto";
import AddIcon from "@material-ui/icons/Add";
import withRoot from "../withRoot";
import AppBar from "../Components/AppBar.jsx";

import Profile from "./profile";
import Home from "./Home";
import HomeOld from "./HomeOld";
import Login from "./Login"

const styles = theme => ({
  fab: {
    margin: 0,
    top: "auto",
    left: "auto",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    position: "fixed"
  },
  top: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 0
  }
});

class Index extends React.Component {


  render() {
    var json={
    "list": 
    [
      { "id": 1,
                "title": "TapEx",
                "date": "11/1/2018",
                "description": "TapEx at Price Center",
                "lender": "1",
                "total": "6.30",
                "owner": "Yvonne Hou",
                "complete": "0",
                "participants": 
                  [
                    {
                        "id": 1,
                        "name": "Jonathan Kiger",
                        "amount": "2.10",
                        "paid": "0"
                        },
                        {
                        "id": 2,
                        "name": "Alex Mao",
                        "amount": "2.10",
                        "paid": "1"
                        }
                    ]
            },
            { "id": 2,
                "title": "Karaoke",
                "date": "10/25/2018",
                "description": "Karaoke at Spot KTV",
                "lender": "0",
                "total": "33.60",
                "owner": "Jonathan Kiger",
                "complete": "0",
                "participants": 
                  [
                    {
                        "id": 1,
                        "name": "Jane Doe",
                        "amount": "11.20",
                        "paid": "0"
                      },
                      {
                        "id": 2,
                        "name": "John Doe",
                        "amount": "11.20",
                        "paid": "1"
                      }
                    ]
            },
            { "id": 3,
                "title": "Portos Fundraiser",
                "date": "10/12/2018",
                "description": "Portos fundraiser for student Org",
                "lender": "1",
                "total": "12",
                "owner": "Alex Mao",
                "complete": "1",
                "participants": 
                  [
                    {
                        "id": 1,
                        "name": "Jonathan Kiger",
                        "amount": "12",
                        "paid": "1"
                      },
                    ]
            }
    ]};

    var json2={"list":[
      { "id": 1, "name": "Yvonne Hou", "u":"guest5", "pw":"pw5", "friends":
        [
          {"id":1, "name": "Jonathan Kiger"},
          {"id":2, "name": "Alex Mao"}
        ]
      },
      { "id": 2, "name": "Alex Mao", "u":"guest4", "pw":"pw4", "friends":
        [
          {"id":1, "name": "Yivonne Hou"},
          {"id":2, "name": "Jonathan Kiger"}
        ]   
      },
      { "id": 3, "name": "Jane Doe", "u":"guest3", "pw":"pw3", "friends":
        [
          {"id":1, "name": "Jonathan Kiger"}
        ]

      },
      { "id": 4, "name": "John Doe", "u":"guest2", "pw":"pw2", "friends":
        [
          {"id":1, "name": "Jonathan Kiger"},
        ]

      },
      { "id": 5, "name": "Jonathan Kiger", "u":"guest1", "pw":"pw1", "friends":
        [
          {"id":1, "name": "Jane Doe"},
          {"id":2, "name": "John Doe"},
          {"id":3, "name": "Yivonne Hou"},
          {"id":4, "name": "Alex Mao"}
        ]

      }
    ]};


    if(sessionStorage.getItem('count')==null){
      //so that this only gets called once
      sessionStorage.setItem('count', 0);
      sessionStorage.setItem('users', JSON.stringify(json2));
      sessionStorage.setItem('activities', JSON.stringify(json));
      var users = JSON.parse(sessionStorage.getItem('users')).list;
      sessionStorage.setItem('currentUser', JSON.stringify(users[4]))
    }

    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/HomeOld" component={HomeOld}/>
          <Route path="/Home" component={Home}/>
          <Route path="/profile" component={Profile} />
        </div>
      </Router>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(Index));
