import React, { useState, useEffect } from 'react';
import './Header.css';
import {
  NavLink,
} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Logo from '../Assets/Images/Logo.png';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { v4 as uuidv4 } from 'uuid';

const options = [
  { name: 'Home', nav: '/' },
  { name: 'Browse Map', nav: '/browse' },
  { name: 'Register', nav: '/' },
];

const ITEM_HEIGHT = 48;

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [active, setActive] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="long-button"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '30ch',
          },
        }}
      >
        {options.map((option) => (
          <NavLink
            to={option.nav}
            className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
            isActive={(match) => {
              if (match) {
                setActive(true);
              }
            }}
            key={uuidv4()}
          >
            <MenuItem key={option.name} selected={active} onClick={handleClose}>
              {option.name}
            </MenuItem>
          </NavLink>
        ))}
      </Menu>
    </div>
  );
}

function Header() {
  const size = useWindowSize();
  return (
    <nav className="header">
      <div className="header-container">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'nav-link-active logo-img-container' : 'nav-link logo-img-container')}
        >
          <img src={Logo} className="logo" alt="Garden City logo" />
        </NavLink>
        {
          size.width > 910 ? (
            <ul className="nav-menu">
              <li>
                <NavLink
                  to="/map"
                  className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
                >
                  Browse Map
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
                >
                  Register
                </NavLink>
              </li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
              >
                <AccountCircleOutlinedIcon sx={{color: '#2A7628'}} />
                <ArrowDropDownIcon />
              </NavLink>
            </ul>
          )
            : (
              <LongMenu />
            )
        }

      </div>
    </nav>
  );
}

export default Header;
