import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components/macro';
import Login from './components/Login'
import Profile from './components/Profile'
import { token } from './components/Spotify';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 100%;
  }
  body {
    min-height: 100%;
    font-family: Circular Std, system, -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px;
    background-color: #181818;
    color: #FFFFFF;
  }
  h1, h2, h3, h4, h5, h6 {
    letter-spacing: -.025em;
    margin: 0 0 10px;
    font-weight: 700;
  }
  h1, h2, h3 {
    font-weight: 900;
  }
`;



const AppContainer = styled.h1`
    height: 100%;
    min-height: 100vh;
`;


const App = () => {
    const [accessToken, setAccessToken] = useState('');
    useEffect(() => {
        setAccessToken(token);
    }, [])

    return (
        <AppContainer>
            <GlobalStyle/>
            {accessToken ? <Profile /> : <Login />  } 
                
        </AppContainer>
        
             

    )
}

export default App;
