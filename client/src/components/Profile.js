import React from 'react';
import User from './User';
import Navbar  from './Navbar';
import Artist from './Artist';
import TopArtists from './TopArtists';
import RecentlyPlayed from './RecentlyPlayed';
import Track from './Track';
import styled from 'styled-components/macro';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import TopTracks from './TopTracks';
// import { Router } from 'express';


const Profile = () => (    
    <Router>
    <Navbar/>
      <Switch>
        <Route path = "/" exact component = {User} />
        {/* <Route path="/artist" component = {Artist} /> */}
        <Route path="/artists" component = {TopArtists} />
        <Route path="/tracks" component = {TopTracks} />
        <Route path="/recent" component = {RecentlyPlayed} />
        <Route path = "/track/:trackId" component = {Track} />
      </Switch>
      
    </Router>
    
    
      
    
  );

  export default Profile;