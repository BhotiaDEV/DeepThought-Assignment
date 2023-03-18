import React from 'react';

import logo from './images/deepthought-logo.svg'

const Header = () => {
  return (
    <nav>
        <div id="left">
            <img src={logo} alt="deepthought"/>
        </div>
        <div id="right">
            <a href="/">
                <i id="home" className=" fa-sharp fa-solid fa-house"></i>
            </a>
            <a href="#">
                <i id="work" className=" fa-solid fa-screwdriver-wrench"></i>
            </a>
            <a href="#">
                <i id="notification" className=" fa-solid fa-bell"></i>
            </a>
            <a href="#">
                <div className="profile"></div>
            </a>
            <div className="burger-menu">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        </div>
    </nav>
  )
}

export default Header