import React from 'react';
import {Router} from '@reach/router';
import Login from './Login';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import "antd/dist/antd.css";
import PatientView from './PatientView';

import Choose  from './Choose';
import MainPage from './MainPage';
const App = () => (
<div>
   {Meteor.userId() ? 
    <MainPage default path="/" />
    
  : 
  <Router>

   <Choose default path="/" />
  <Login  path="/login" />
  <PatientView path="/view" />
  </Router>

   }
  </div>
);

export default App;
