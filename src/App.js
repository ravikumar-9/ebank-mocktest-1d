import {Route, Switch} from 'react-router-dom'

import Home from './components/Home'

import Login from './components/Login'

import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

// Replace your code here
const App = () => (
  <>
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <Route exact path="/ebank/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
