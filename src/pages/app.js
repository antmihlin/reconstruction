import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from './home/home';
import Calculator from './calculator/calculator';

const App = ()=>(
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/calculator">Calculator</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/calculator" component={Calculator} />
    </main>
  </div>
);

export default App;

