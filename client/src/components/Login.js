import React from 'react';
import styled from 'styled-components/macro';

const LoginURL = 'http://localhost:8888/login';

const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  h1 {
    font-size: 32px;
  }
`;

const LoginButton = styled.a`
  display: inline-block;
  background-color: #1DB954;
  color: #FFFFFF ;
  border-radius: 30px;
  padding: 17px 35px;
  margin: 20px 0 70px;
  min-width: 160px;
  font-size : 16px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  &:hover,
  &:focus {
    background-color: #1ed760;
  }
`;

const Login = () => (
    <LoginPage>
        <h1>Spotify Profile</h1>
        <LoginButton href={LoginURL}>Log in to Spotify</LoginButton>
    </LoginPage>
      
    
  );

  export default Login;