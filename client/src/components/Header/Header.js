import React from 'react';
import "./Header.scss";
import FirstHeader from './FirstHeader/FirstHeader';
import SecondHeader from './SecondHeader/SecondHeader';
const Header = () => {
  return (
    <div className="header">
        <FirstHeader/>
        <SecondHeader />
    </div>
  )
}

export default Header;