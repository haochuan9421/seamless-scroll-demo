import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Mobile from './pages/Mobile';
import PC from './pages/PC';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact render={() => <Redirect to={window.screen.width < 1024 ? '/mobile' : '/pc'} />} />
          <Route path='/mobile' exact component={Mobile} />
          <Route path='/pc' exact component={PC} />
        </Switch>
      </Router>
    );
  }
}

export default App;
