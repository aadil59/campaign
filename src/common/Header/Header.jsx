import React from 'react';
import logo from '../logo.jpg';
import './Header.css';

export default function Header () {
  
  return (
    <header className='header py-3 mb-4'>
      <div className="container">
        <div className='logo d-flex justify-content-between align-items-center'>
          <img alt='logo' src={logo} />
        </div>
      </div>
    </header>
  )
}