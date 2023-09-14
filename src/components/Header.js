import React from 'react';
import headerLogo from '../images/header-logo.svg';

export function Header(props) {
  return (
    <header className="header">  
      <img className="header__logo" src={headerLogo} alt='"Логотип."'/>
    </header> 
  );
}

export default Header; 