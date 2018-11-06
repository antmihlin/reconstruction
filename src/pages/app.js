import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from './home/home';
import Calculator from './calculator/calculator';

import Header from '../layout/header';

const App = ()=>(
  <div>
    <header>
      <Header />
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/calculator" component={Calculator} />
    </main>
  </div>
);

export default App;

