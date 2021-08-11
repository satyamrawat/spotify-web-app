import React from 'react'
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import spotify_icon from './images/spotify_icon.png';
import user_icon from './images/user_icon.png'
import mic_icon from './images/mic_icon.png'
import track_icon from './images/track_icon.png'
import recent_icon from './images/recent_icon.png'
import logout_icon from './images/logout_icon.png'

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  font-family: Circular Std;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100px;
  background-color: #040306;
  text-align: center;
  z-index: 99;
`;

const Logo = styled.div`
  color: #1DB954;
  margin-top: 5px;
  max-width: 100%;
  width: auto;
  height: auto;
  transition: all 0.25s cubic-bezier(0.3, 0, 0.4, 1);
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  color : #FFFFFF;
`;

const MenuItem = styled.div`
  color: #FFFFFF;
  font-size: 11px;
  width : 100px;
 
  a {
    display: block;
    justify-content: space-between;
  align-items: center;
    padding: 15px 0 15px 0;
    text-decoration : none;
    border-left: 5px solid transparent;
    width: 100%;
    height: 100%;
    &:hover,
    &:focus,
    &.active {
      color: #FFFFFF;
      background-color: #181818;
      border-left: 5px solid #1ed760;
    
    }
  };
`;

export const Navbar = () => {
    return (
        <Nav>
            
            <Logo>
              <Link to = "/">
                <img style={{width:"70px", height:"70px"}} src = {spotify_icon} alt = "" />
                </Link>
            </Logo>
            
            <Menu>
              <MenuItem>
                <Link to = "/">
                  <img style={{width:"35px", height:"35px"}} src = {user_icon} alt = "" />
                  <div style={{color : "#FFFFFF"}}>Profile</div>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to = "/artists">
                  <img style={{width:"35px", height:"35px"}} src = {mic_icon} alt = "" />
                  <div style={{color : "#FFFFFF"}}>Top Artist</div>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to = "/tracks">
                  <img style={{width:"35px", height:"35px"}} src = {track_icon} alt = "" />
                  <div style={{color : "#FFFFFF"}}>Top Tracks</div>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to = "/recent">
                  <img style={{width:"35px", height:"35px"}} src = {recent_icon} alt = "" />
                  <div style={{color : "#FFFFFF"}}>Recent</div>
                </Link>
              </MenuItem>

            </Menu>

            <Logo>
              <Link to = "/">
                <img style={{width:"50px", height:"50px"}} src = {logout_icon} alt = "" />
                </Link>
            </Logo>
            
        </Nav>
    )
}


export default Navbar;