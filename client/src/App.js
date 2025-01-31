import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

//components
import Landing from './components/Landing.js';
import Dashboard from './components/Dashboard.js';
import Profile from './components/Profile.js';
import NavBar from './components/NavBar.js';
import Table from './components/Table.js';
import Flash from './components/Flash';
import TableSettings from './components/TableSettings.js';

//services
import http from '../services/http/http.js';
import auth from '../services/auth.js';

//utils
import global from '../utils/global';
import table from '../utils/table';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '', //NB userId should be deprecated in favor of user, which contains id
      user: {},
      tables: [],
      shownTable: null,
      newPlayer: [],
      // dashboard edit profile form
      profile: {
        editName: '',
        editEmail: '',
        editPassword: '',
      },
      cards: [],
      flash: {
        show: false,
        message: 'Default flash message for testing',
        variant: 'success',
      },
      loading: false,
      labels: [
        { id: 5, label_name: 'FrontEnd', color: '#60BE4E' },
        { id: 6, label_name: 'BackEnd', color: '#FF9E1A' },
        { id: 7, label_name: 'GitHub', color: '#C377E0' },
        { id: 8, label_name: 'Bug', color: '#FF77CC' },
        { id: 9, label_name: 'Review', color: '#50E897' },
        { id: 10, label_name: 'Research', color: '#00C2E2' },
        { id: 11, label_name: 'Styling', color: '#0079C0' },
        { id: 12, label_name: 'Implementation', color: '#EA5946' },
        { id: 13, label_name: 'Planning', color: '#4D4D4D' },
        { id: 14, label_name: 'User Stories', color: '#F1D600' },
      ],
      showTableModal: false,
    };
  }

  async componentDidMount() {
    this.loading(true);
    global.flash = this.flash.bind(this);
    global.loading = this.loading.bind(this);
    global.setState = this.setState.bind(this);
    if (localStorage.getItem('token')) {
      await this.login();
      this.loading(false);
    } else {
      this.loading(false);
    }
  }

  loading(loading) {
    this.setState({ loading });
    setTimeout(() => {
      if (this.state.loading) {
        global.setState({ loading: false });
      }
    }, 5000);
  }

  flash(message, variant, interval) {
    this.setState({ flash: { show: true, message, variant } });
    setTimeout(() => {
      this.setState({ flash: { show: false, message, variant } });
    }, interval);
  }

  async login() {
    auth.setUser(this);
    await this.getTables();
    await this.getUser();
    await this.getCards();
  }

  async getCards() {
    const userID = auth.getUser();
    if (userID) {
      const cards = await http.users.getCardsByUser(userID);
      this.setState({ cards });
    }
  }

  async getTables() {
    const userId = auth.getUser();
    if (userId) {
      const tables = await http.tables.get(userId);
      tables.sort((a,b) => {return a.id - b.id});
      for (let i = 0; i < tables.length; i++){
        if (tables[i+1] && tables[i+1].id === tables[i].id){
          tables.splice(i+1, 1);
          i--;
        }
      }
      console.log(tables)
      this.setState({ tables });
      if (table.mounted) {
        const theTable = this.getTableObject(table.id);
        console.log('The table ', theTable);
        table.setState({ table: theTable });
      }
    }
  }

  async getUser() {
    const userId = auth.getUser();
    if (userId) {
      const user = await http.users.get(userId);
      this.setState({ user });
    }
  }

  async addTable(name, emails) {
    const newTable = await http.tables.post({ name });
    const tableId = newTable.id;
    http.tables.postUser(tableId, this.state.user.email);
    const tables = [...this.state.tables];
    tables.push(newTable);
    this.setState({ tables });
    for (let email of emails) {
      http.tables.postUser(tableId, email);
    }
    this.changeTableModal();
  }

  logOut() {
    auth.logout();
    auth.setUser(this);
  }

  changeTableModal() {
    this.setState({ showTableModal: !this.state.showTableModal });
  }

  changeTable(id) {
    this.setState({ showenTable: id });
  }

  addPlayerToTable(playerName) {
    this.setState(prevState => ({
      newPlayer: [... new Set([...prevState.newPlayer, playerName])]
    }))
  }

  removePlayerToTable(playerName) {
    let index = this.state.newPlayer.indexOf(playerName);
    let tempArr = this.state.newPlayer.slice();
    tempArr.splice(index, 1)
    this.setState({newPlayer: tempArr})
  }
  render() {
    return (
      <>
        <Router>
          {auth.userIsLoggedIn() ? (
            <NavBar
              addTable={this.addTable.bind(this)}
              addPlayerToTable={this.addPlayerToTable.bind(this)}
              removePlayerToTable={this.removePlayerToTable.bind(this)}
              logOut={this.logOut.bind(this)}
              showTableModal={this.state.showTableModal}
              changeTableModal={this.changeTableModal.bind(this)}
              changeTable={this.changeTable.bind(this)}
              tables={this.state.tables}
              showenTable={this.state.showenTable}
              newPlayer={this.state.newPlayer}
              userName={this.state.user.name}
            />
          ) : null}
          <Route
            path="/"
            exact
            render={props => (
              <Landing {...props} login={this.login.bind(this)} />
            )}
          />
          <Route
            path="/dashboard"
            render={props => (
              <Dashboard
                {...props}
                // state props
                state={this.state}
                user={this.state.user}
                userId={this.state.userId}
                tables={this.state.tables}
                cards={this.state.cards}
                editProfileName={this.state.profile.editName}
                editProfileEmail={this.state.profile.editEmail}
                editProfilePassword={this.state.profile.editPassword}
                // functions
                labels={this.state.labels}
                changeProfileName={this.changeProfileName}
                changeProfileEmail={this.changeProfileEmail}
                changeProfilePassword={this.changeProfilePassword}
                submitProfileChanges={this.submitProfileChanges}
              />
            )}
          />
          <Route path="/profile" component={Profile} />
          <Route
            path={`/table/:id`}
            render={props => (
              <Table {...props} loading={this.loading.bind(this)} />
            )}
          />
          <Route path="/TableSettings" component={TableSettings} />
        </Router>
        <Flash flashData={this.state.flash} />
        {this.state.loading ? (
          <Spinner
            animation="border"
            variant="success"
            className="APP__spinner"
          />
        ) : null}
      </>
    );
  }
}
