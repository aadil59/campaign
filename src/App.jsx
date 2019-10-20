import React from 'react';
import Header from "./common/Header/Header";
import Campaigns from "./container/Campaigns";
import './App.css';

function App() {
  return (
    <div className="App">
      <Header className="App-header" />
      <Campaigns />
    </div>
  );
}

export default App;
