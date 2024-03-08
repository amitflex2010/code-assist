import React from 'react';
import {  NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Routeing(){

    const [activeLink, setActiveLink] = useState('/Build');

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };
    return (
        <>
        <div className='Parentclshome'>
            <div className='Routngcls'>
           <ul className='routerparnt'>
           <li>
           <NavLink
            className={`nav-links ${activeLink === '/Build' ? 'active' : ''}`}
            to='/Build'
            onClick={() => handleNavLinkClick('/Build')}
          >
            Build my Code
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`nav-links ${activeLink === '/Help' ? 'active' : ''}`}
            to='/Help'
            onClick={() => handleNavLinkClick('/Help')}
          >
            Help me understand a code
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`nav-links ${activeLink === '/Modify' ? 'active' : ''}`}
            to='/Modify'
            onClick={() => handleNavLinkClick('/Modify')}
          >
            Modify my code
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`nav-links ${activeLink === '/testCode' ? 'active' : ''}`}
            to='/testCode'
            onClick={() => handleNavLinkClick('/testCode')}
          >
            Help me test a code
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`nav-links ${activeLink === '/translate' ? 'active' : ''}`}
            to='/translate'
            onClick={() => handleNavLinkClick('/translate')}
          >
            Translate my code
          </NavLink>
            </li>
           </ul>
           </div>
          
           
           
           </div>
        </>
    )
} 