import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing.js';
import Dashboard from './components/Dashboard.js';
import Profile from './components/Profile.js';
import auth from '../services/auth.js';
import NavBar from './components/NavBar.js';
import Table from './components/Table.js';
import Flash from './components/Flash';
import http from '../services/http/http.js';


import global from '../utils/global'
// import tables from '../dummyData/tables.js';
import TableSettings from './components/TableSettings.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      boards: [],
      // dashboard edit profile form
      editProfileName: '',
      editProfileEmail: '',
<<<<<<< HEAD
      editProfilePassword: ''
  }

  // dashboard onChange event functions
  this.changeProfileName = this.changeProfileName.bind(this);
  this.changeProfileEmail = this.changeProfileEmail.bind(this);
  this.changeProfilePassword = this.changeProfilePassword.bind(this);
  this.submitProfileChanges = this.submitProfileChanges.bind(this);
}
=======
      editProfilePassword: '',
      flash: {
        show: false,
        message: 'Default flash message for testing',
        variant: 'success'
      },

      showTableModal: false
    };
    this.api = `http://localhost:8000/api/example`;

    // dashboard onChange event functions
    this.changeProfileName = this.changeProfileName.bind(this);
    this.changeProfileEmail = this.changeProfileEmail.bind(this);
    this.changeProfilePassword = this.changeProfilePassword.bind(this);
    this.submitProfileChanges = this.submitProfileChanges.bind(this);
  }

<<<<<<< HEAD
>>>>>>> 3531f1497f6777657533a4bc7103c58a685fd55f

componentDidMount() {    
  global.flash = this.flash.bind(this)
  if(localStorage.getItem('token')) {
    this.login();
=======
  componentDidMount() {
    global.flash = this.flash.bind(this);
    if (localStorage.getItem('token')) {
      this.login();
    }
>>>>>>> ac47602c4098202ebe1164fe014c64f155c72e59
  }

  flash(message, variant, interval) {
    this.setState({ flash: { show: true, message, variant } });
    setTimeout(() => {
      this.setState({ flash: { show: false, message, variant } });
    }, interval);
  }

<<<<<<< HEAD
<<<<<<< HEAD
  // dashboard onChange event and submit functions
  changeProfileName(e) {
    this.setState({ editProfileName: e.target.value });
  }

  changeProfileEmail(e) {
    this.setState({ editProfileEmail: e.target.value });
  }

  changeProfilePassword(e) {
    this.setState({ editProfilePassword: e.target.value });
  }

  submitProfileChanges() {
    http.users.post(this.state.editProfileName, this.state.editProfileEmail, this.state.editProfilePassword)
      .then(() => 
        this.setState({ editProfileName: '' }),
        this.setState({ editProfileEmail: ''}),
        this.setState({ editProfilePassword: ''})
      )
      .catch(err => console.log('Error: ', err));

  }
=======
login() {
  auth.setUser(this);
}
=======
  login() {
    auth.setUser(this);
  }
>>>>>>> ac47602c4098202ebe1164fe014c64f155c72e59

logOut(){
  auth.logout();
  auth.setUser(this);
}

  changeTableModal() {
    this.setState({ showTableModal: !this.state.showTableModal });
  }

// dashboard onChange event and submit functions
changeProfileName(e) {
  this.setState({ editProfileName: e.target.value });
}

changeProfileEmail(e) {
  this.setState({ editProfileEmail: e.target.value });
}

changeProfilePassword(e) {
  this.setState({ editProfilePassword: e.target.value });
}

submitProfileChanges() {
  http.users.post(this.state.editProfileName, this.state.editProfileEmail, this.state.editProfilePassword)
    .then(() => 
      this.setState({ editProfileName: '' }),
      this.setState({ editProfileEmail: ''}),
      this.setState({ editProfilePassword: ''})
    )
    .catch(err => console.log('Error: ', err));
}
>>>>>>> 3531f1497f6777657533a4bc7103c58a685fd55f

  render() {
    return (
      <>
        <Router>
<<<<<<< HEAD
<<<<<<< HEAD
        <h1>Welcome to Blue Ocean!</h1>
        <NavBar />
          <Route path="/" exact component={ Landing } />
          <Route 
=======
=======

>>>>>>> ac47602c4098202ebe1164fe014c64f155c72e59
        {this.state.userId ===''?<Landing login={this.login.bind(this)}/>:<NavBar logOut ={this.logOut.bind(this)}/>}
        <Route 
>>>>>>> 3531f1497f6777657533a4bc7103c58a685fd55f
            path="/dashboard"
            render={props => 
              <Dashboard {...props}
              // state props
                boards={this.state.boards}
                editProfileName={this.state.editProfileName}
                editProfileEmail={this.state.editProfileEmail}
                editProfilePassword={this.state.editProfilePassword}

              // functions
                changeProfileName={this.changeProfileName}
                changeProfileEmail={this.changeProfileEmail}
                changeProfilePassword={this.changeProfilePassword}
                submitProfileChanges={this.submitProfileChanges}
            />}
            
           />
          <Route path="/profile" component={ Profile } />
          <Route path="/table" component={ Table } />
<<<<<<< HEAD
          {/* <Dashboard boards={this.state.boards} /> */}
=======
          <Route path="/TableSettings" component={ TableSettings } />
>>>>>>> 3531f1497f6777657533a4bc7103c58a685fd55f
        </Router>
        <Flash flashData={this.state.flash} />
      </>
    );
  }
}
